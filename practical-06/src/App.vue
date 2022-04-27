<template>
  <div id="app">
    <NavBar />
    <transition name="slideLeft">
      <router-view appear :key="$router.path"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  components: {},
};
</script>
<style>
/* @import "vue2-animate/dist/vue2-animate.min.css"; */
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
