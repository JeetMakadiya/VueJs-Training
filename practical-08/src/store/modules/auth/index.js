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
    // http://www.mockbin.org/bin/c80b8c90-22de-4562-a5e5-2f44f0f14b38?foo=bar&foo=baz
    await Axios.post("https://reqres.in/api/login", {
      email: data.userEmail,
      password: data.userPassword,
    })
      .then((res) => {
        commit("setLoading", false);
        if (res.data.token) {
          document.cookie = `authToken=${res.data.token}`;
          commit("setIsAuthenticated", true);
          router.push({ name: "home" });
        }
      })
      .catch((err) => {
        console.log(err);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
