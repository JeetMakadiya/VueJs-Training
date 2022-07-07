<template>
  <v-app-bar app color="primary" elevate-on-scroll>
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-toolbar-title class="white--text">Car Showroom</v-toolbar-title>
    <v-spacer></v-spacer>
    <div>
      <v-btn
        class="white--text nav_btn"
        v-if="!this.isAuthenticated"
        to="/login"
        text
      >
        Login
      </v-btn>
      <v-btn
        class="white--text nav_btn"
        v-if="!this.isAuthenticated"
        to="/register"
        text
      >
        Register
      </v-btn>
      <v-btn
        small
        text
        class="white--text nav_btn"
        v-if="this.isAuthenticated"
        :to="{ name: 'home' }"
      >
        Home
      </v-btn>
      <v-btn
        small
        text
        class="white--text nav_btn"
        v-if="this.isAuthenticated"
        :to="{ name: 'userList' }"
      >
        UserList
      </v-btn>
      <v-btn
        v-if="this.isAuthenticated"
        @click="openFormModal"
        small
        text
        class="white--text"
        >Add Car</v-btn
      >
      <v-menu offset-y v-if="this.isAuthenticated">
        <template v-slot:activator="{ on, attrs }">
          <v-btn small text v-bind="attrs" v-on="on" class="white--text">
            {{ userData.email }}
            <v-icon dense>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="this.handleLogout">
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
  text-decoration: none;
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
