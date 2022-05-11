import Axios from "axios";
import router from "../../../router";
// local state
const state = {
  users: [],
  isAuthenticated: false,
  isLoading: false,
  errorMsg: "",
};

const getters = {
  // state is module's local state
  getUsers(state) {
    return state.users;
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
    // https://reqres.in/api/login
    await Axios.post("http://localhost:8081/api", {
      email: data.userEmail,
      password: data.userPassword,
    })
      .then((res) => {
        commit("setLoading", false);
        if (res.status === 200) {
          commit("setIsAuthenticated", true);
          router.push({ name: "home" });
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
  checkAuthenticated({ commit }) {
    let position = document.cookie.search("authToken");
    if (position !== -1) {
      commit("setIsAuthenticated", true);
    } else {
      commit("setIsAuthenticated", false);
    }
  },
  logoutUser({ commit }) {
    document.cookie = "authToken=''";
    commit("setIsAuthenticated", false);
    router.push({ name: "login" });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
