<template>
  <v-app-bar app color="primary" elevate-on-scroll>
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-toolbar-title class="white--text">Car Showroom</v-toolbar-title>
    <v-spacer></v-spacer>
    <div>
      <!-- <router-link :to="{ name: 'login' }"> -->
      <v-btn
        class="white--text nav_btn"
        v-if="!this.isAuthenticated"
        to="/login"
        text
        >Login</v-btn
      >
      <!-- </router-link> -->
      <!-- <router-link :to="{ name: 'register' }"> -->
      <v-btn
        class="white--text nav_btn"
        v-if="!this.isAuthenticated"
        to="/register"
        text
        >Register</v-btn
      >
      <!-- </router-link> -->
      <router-link
        class="nav_btn"
        v-if="this.isAuthenticated"
        :to="{ name: 'home' }"
      >
        <v-btn small>Home</v-btn>
      </router-link>
      <v-btn v-if="this.isAuthenticated" @click="openFormModal" small
        >Add Car</v-btn
      >
      <v-btn v-if="this.isAuthenticated" small>Logout</v-btn>
    </div>
  </v-app-bar>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      navBarText: "Car Showroom",
    };
  },
  computed: {
    userData() {
      return this.$store.getters["auth/getUserData"];
    },
    isAuthenticated() {
      return this.$store.getters["auth/getIsAuthenticated"];
    },
  },
  methods: {
    openFormModal() {
      this.$store.commit("ui/openDialog", { type: "add" });
    },
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
