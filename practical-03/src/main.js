import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import NavBar from "./components/NavBar.vue";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Creating global component: NavBar
Vue.component("NavBar", NavBar);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
