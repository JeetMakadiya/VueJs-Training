<template>
  <nav
    class="ps-5 pe-5 bg-primary d-flex justify-content-between align-items-center"
    style="height: 14vh"
  >
    <h1 class="text-center text-light">{{ navBarText }}</h1>
    <div>
      <router-link to="/" class="btn text-light fw-bold fs-5 nav_btn">
        Home
      </router-link>
      <router-link to="/login" class="btn me-3 text-light fw-bold fs-5 nav_btn">
        Login
      </router-link>
      <router-link
        to="/register"
        class="btn me-3 text-light fw-bold fs-5 nav_btn"
      >
        Register
      </router-link>
      <b-button variant="light" v-b-modal.modal-prevent-closing
        >Add Car</b-button
      >
    </div>
  </nav>
</template>
<script>
// import FormModal from "./FormModal.vue";
export default {
  name: "NavBar",
  components: {
    // FormModal,
  },
  data() {
    return {
      navBarText: "Car Showroom",
    };
  },
};
</script>

<style>
.nav_btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: white !important;
}
</style>
