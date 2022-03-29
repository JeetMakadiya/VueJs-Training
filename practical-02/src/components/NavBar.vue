<template>
  <nav class="bg-primary pt-2 pb-2">
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
