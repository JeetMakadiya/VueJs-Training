<template>
  <nav
    class="ps-5 pe-5 bg-primary d-flex justify-content-between align-items-center"
    style="height: 14vh"
  >
    <h1 class="text-center text-light">{{ navBarText }}</h1>
    <div>
      <b-button
        variant="transparent"
        class="me-3 text-light fw-bold fs-5 nav_btn"
        v-b-modal.modal-prevent-closing
      >
        <router-link>Home</router-link>
      </b-button>
      <b-button
        variant="transparent"
        class="me-3 text-light fw-bold fs-5 nav_btn"
        v-b-modal.modal-prevent-closing
        >Login</b-button
      >
      <b-button
        variant="transparent"
        class="me-3 text-light fw-bold fs-5 nav_btn"
        v-b-modal.modal-prevent-closing
        >Register</b-button
      >
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
