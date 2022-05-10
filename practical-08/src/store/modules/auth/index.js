import Axios from "axios";
import router from "../../../router";
// local state
const state = {
  users: [],
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
};

const mutations = {
  setLoading(state, status) {
    state.isLoading = status;
  },
  setErrorMsg(state, msg) {
    state.errorMsg = msg;
  },
};

const actions = {
  async loginUser({ commit }, data) {
    commit("setLoading", true);
    commit("setErrorMsg", "");
    await Axios.post(
      "http://www.mockbin.org/bin/c80b8c90-22de-4562-a5e5-2f44f0f14b38?foo=bar&foo=baz",
      {
        email: data.userEmail,
        password: data.userPassword,
      }
    )
      .then((res) => {
        console.log(res);
        console.log(this.$cookies.get("authToken"));
        commit("setLoading", false);
        if (res && res.data) {
          if (
            data.userEmail === res.data.email &&
            data.userPassword === res.data.password
          ) {
            router.push({ name: "home" });
          } else {
            commit("setErrorMsg", "Invalid Credentials!");
          }
        } else {
          commit("setErrorMsg", "Oops,Something went wrong!");
        }
      })
      .catch(() => {
        commit("setLoading", false);
        commit("setErrorMsg", "Oops,Something went wrong!");
      });
    // fetch(
    //   "http://www.mockbin.org/bin/0cf744ce-b8ce-46d3-ba15-b70ac6160f46?foo=bar&foo=baz",
    //   {
    //     method: "POST",
    //     headers: {
    //       cookie: "foo=bar; bar=baz",
    //     },
    //     body: {
    //       foo: "bar",
    //       bar: "baz",
    //     },
    //   }
    // )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
