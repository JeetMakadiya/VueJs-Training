import Vue from "vue";
import VueRouter from "vue-router";
import jwt_decode from "jwt-decode";
import store from "../store";
const HomePage = () => import("../Pages/HomePage.vue");
const LoginPage = () => import("../Pages/LoginPage.vue");
const RegisterPage = () => import("../Pages/RegisterPage.vue");
const CarDetailsPage = () => import("../Pages/CarDetailsPage.vue");

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { name: "home" } },
  { path: "/home", name: "home", component: HomePage },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/register", name: "register", component: RegisterPage },
  { path: "/carDetails/:carId", name: "carDetails", component: CarDetailsPage },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = false;
  let userData = {};
  if (window.$cookies.get("authToken")) {
    isAuthenticated = true;
    userData = jwt_decode(window.$cookies.get("authToken"));
    store.commit("auth/setUserData", userData);
  }

  if (to.name !== "login" && to.name !== "register" && !isAuthenticated) {
    next({ name: "login" });
  } else if (
    (to.name === "login" || to.name === "register") &&
    isAuthenticated
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});
export default router;
