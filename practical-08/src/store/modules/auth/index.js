import Axios from "axios";
import router from "../../../router";
import jwt_decode from "jwt-decode";

// local state
const state = {
  users: [],
  userData: {
    email: "",
    password: "",
  },
  isAuthenticated: false,
  isLoading: false,
  errorMsg: "",
};

const getters = {
  // state is module's local state
  getUsers(state) {
    return state.users;
  },
  getUserData(state) {
    return state.userData;
  },
  getIsLoading(state) {
    return state.isLoading;
  },
  getErrorMsg(state) {
    return state.errorMsg;
  },
  getIsAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const mutations = {
  setUserData(state, data) {
    state.userData = data;
  },
  setLoading(state, status) {
    state.isLoading = status;
  },
  setErrorMsg(state, msg) {
    state.errorMsg = msg;
  },
  setIsAuthenticated(state, status) {
    state.isAuthenticated = status;
  },
};

const actions = {
  async loginUser({ commit }, data) {
    commit("setLoading", true);
    commit("setErrorMsg", "");
    await Axios.post("http://localhost:8080/api", {
      email: data.userEmail,
      password: data.userPassword,
    })
      .then((res) => {
        commit("setLoading", false);
        if (res.status === 200) {
          commit("setIsAuthenticated", true);
          router.replace({ name: "home" });
          let userData = jwt_decode(window.$cookies.get("authToken"));
          commit("setUserData", userData);
        }
      })
      .catch(() => {
        commit("setLoading", false);
        commit("setErrorMsg", "Oops,Something went wrong!");
      });
  },
  async registerUser({ commit }, payload) {
    commit("setLoading", true);
    commit("setErrorMsg", "");
    let userDetails = {
      name: payload.name,
      email: payload.email,
      role: payload.selectedRole,
      password: payload.password,
      age: payload.age,
      dob: payload.dob,
      gender: payload.selectedGender,
    };
    await Axios.post(
      "https://testapi.io/api/dartya/resource/users",
      userDetails
    )
      .then(() => {
        commit("setLoading", false);
        router.push({ name: "login" });
      })
      .catch(() => {
        commit("setLoading", false);
        commit("setErrorMsg", "Oops! Something went wrong!");
      });
  },
  logoutUser({ commit }) {
    window.$cookies.remove("authToken");
    commit("setIsAuthenticated", false);
    router.replace({ name: "login" });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
