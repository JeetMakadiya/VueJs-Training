<template>
  <div id="app">
    <NavBar />
    <transition name="slideLeft" mode="out-in">
      <router-view appear :key="$router.path"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  mounted() {
    if (this.$cookies.get("authToken")) {
      this.$store.commit("auth/setIsAuthenticated", true);
    } else {
      this.$store.commit("auth/setIsAuthenticated", false);
    }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
