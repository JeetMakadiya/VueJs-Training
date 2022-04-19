import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../Pages/HomePage.vue";
import LoginPage from "../Pages/LoginPage.vue";
import RegisterPage from "../Pages/RegisterPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
  ],
});

export default router;
