import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../Pages/HomePage.vue";
import LoginPage from "../Pages/LoginPage.vue";
import RegisterPage from "../Pages/RegisterPage.vue";
import CarDetailsPage from "../Pages/CarDetailsPage.vue";
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
  console.log(window.$cookies.get("authToken"));
  let position = document.cookie.search("authToken");
  if (position !== -1) {
    isAuthenticated = true;
  }
  if (to.name === "register" && !isAuthenticated) {
    next();
  } else if (to.name !== "login" && !isAuthenticated) {
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
