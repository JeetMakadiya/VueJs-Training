import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import cars from "./modules/cars";
import ui from "./modules/ui";

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: true,
  modules: {
    auth,
    cars,
    ui,
  },
});
export default store;
