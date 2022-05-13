<template>
  <nav
    class="ps-5 pe-5 bg-primary d-flex justify-content-between align-items-center"
    style="height: 14vh"
  >
    <h1 class="text-center text-light">{{ navBarText }}</h1>
    <div v-if="!this.isAuthenticated">
      <router-link
        :to="{ name: 'login' }"
        class="btn me-3 text-light fw-bold fs-5 nav_btn"
      >
        Login
      </router-link>
      <router-link
        :to="{ name: 'register' }"
        class="btn me-3 text-light fw-bold fs-5 nav_btn"
      >
        Register
      </router-link>
    </div>
    <div v-if="this.isAuthenticated">
      <router-link
        :to="{ name: 'home' }"
        class="btn me-3 text-light fw-bold fs-5 nav_btn"
      >
        Home
      </router-link>
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
        <b-dropdown-item @click.prevent="handleLogout">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  components: {},
  data() {
    return {
      navBarText: "Car Showroom",
    };
  },
  computed: {
    ...mapGetters({
      userData: "auth/getUserData",
      isAuthenticated: "auth/getIsAuthenticated",
    }),
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logoutUser");
    },
  },
};
</script>

<style>
.nav_btn {
  transition: all 0.4s linear;
}
.nav_btn:hover {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.2);
}
.nav_btn.router-link-exact-active {
  color: black !important;
  background-color: white !important;
}
.addCarBtn:hover {
  transition: all 0.5s linear;
}
</style>
