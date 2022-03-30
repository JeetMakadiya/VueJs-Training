<template>
  <nav
    class="bg-primary d-flex justify-content-center align-items-center"
    style="height: 14vh"
  >
    <h1 class="text-center text-light">{{ navBarText }}</h1>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      navBarText: "Car Showroom",
    };
  },
};
</script>
