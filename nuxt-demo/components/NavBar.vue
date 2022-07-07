<template>
  <nav
    class="ps-5 pe-5 bg-primary d-flex justify-content-between align-items-center"
    style="height: 14vh"
  >
    <h1 class="text-center text-light">{{ navBarText }}</h1>
    <div v-if="this.isAuthenticated">
      <NuxtLink to="/Home" class="btn me-3 text-light fw-bold fs-5 nav_btn">
        Home
      </NuxtLink>
      <b-button
        variant="transparent"
        class="me-3 text-light fw-bold fs-5 nav_btn"
        v-b-modal.modal-prevent-closing
      >
        Add Car
      </b-button>
      <b-dropdown
        id="dropdown-right"
        right
        :text="this.userData.email"
        variant="primary"
        size="lg"
        class="text-light fw-bold fs-5 nav_btn"
      >
        <b-dropdown-item @click="this.handleLogout">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
    <div v-if="!this.isAuthenticated">
      <NuxtLink to="/Login" class="btn me-3 text-light fw-bold fs-5 nav_btn">
        Login
      </NuxtLink>
      <NuxtLink to="/Register" class="btn me-3 text-light fw-bold fs-5 nav_btn">
        Register
      </NuxtLink>
    </div>
  </nav>
</template>
<script>
import jwt_decode from "jwt-decode";
import {
  computed,
  defineComponent,
  useRouter,
  useStore,
  onMounted,
  ref,
} from "@nuxtjs/composition-api";

export default defineComponent({
  name: "NavBar",
  setup(_, context) {
    const store = useStore();
    const router = useRouter();
    const navBarText = ref("Car Showroom");
    // Computed
    const userData = computed(() => {
      return store.getters["auth/getUserData"];
    });
    const isAuthenticated = computed(() => {
      return store.getters["auth/getIsAuthenticated"];
    });
    // Methods
    function handleLogout() {
      context.root.$cookies.remove("authToken");
      store.commit("auth/setIsAuthenticated", false);
      router.push("/Login");
    }
    onMounted(() => {
      if (context.root.$cookies.get("authToken")) {
        store.commit("auth/setIsAuthenticated", true);
        let userData = jwt_decode(context.root.$cookies.get("authToken"));
        store.commit("auth/setUserData", userData);
      } else {
        store.commit("auth/setIsAuthenticated", false);
      }
    });
    return { navBarText, userData, isAuthenticated, handleLogout };
  },
});
</script>
<style>
.nav_btn {
  transition: all 0.4s linear;
}
.nav_btn:hover {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.2);
}
.nav_btn.nuxt-link-exact-active {
  color: black !important;
  background-color: white !important;
}
.addCarBtn:hover {
  transition: all 0.5s linear;
}
</style>
