import Vuex from "vuex";
import auth from "./modules/auth";
import cars from "./modules/cars";

const createStore = () => {
  return new Vuex.Store({
    actions: {
      nuxtServerInit({ commit }) {
        if (this.$cookies.get("authToken")) {
          console.log("true");
          commit("auth/setIsAuthenticated", true);
        } else {
          console.log("false");
          commit("auth/setIsAuthenticated", false);
        }
      },
    },
    namespaced: true,
    modules: {
      auth,
      cars,
    },
  });
};

export default createStore;
