import Vue from "vue";
import Vuex from "vuex";
import usersData from "./modules/users";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    usersData,
    auth,
  },
});
