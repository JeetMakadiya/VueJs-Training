import jwt_decode from "jwt-decode";

// local state
const state = () => ({
  users: [],
  userData: {
    email: "",
    password: "",
  },
  isAuthenticated: false,
  isLoading: false,
  errorMsg: "",
});

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
    const response = await this.$axios
      .$post("http://localhost:3000/api", {
        email: data.userEmail,
        password: data.userPassword,
      })
      .then((res) => {
        commit("setLoading", false);
        commit("setIsAuthenticated", true);
        let userData = jwt_decode(this.$cookies.get("authToken"));
        commit("setUserData", userData);
        return "success";
      })
      .catch(() => {
        commit("setLoading", false);
        commit("setErrorMsg", "Oops,Something went wrong!");
        return "error";
      });
    return response;
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
    await this.$axios
      .$post("https://testapi.io/api/dartya/resource/users", userDetails)
      .then(() => {
        commit("setLoading", false);
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
