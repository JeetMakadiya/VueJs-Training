import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import auth from "./modules/auth";
import cars from "./modules/cars";

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: true,
  modules: {
    auth,
    users,
    cars,
  },
});
export default store;
