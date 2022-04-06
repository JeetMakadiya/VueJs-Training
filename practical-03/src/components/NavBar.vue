<template>
  <nav
    class="ps-5 pe-5 bg-primary d-flex justify-content-between align-items-center"
    style="height: 14vh"
  >
    <h1 class="text-center text-light">{{ navBarText }}</h1>
    <b-button variant="light" v-b-modal.modal-prevent-closing>Add Car</b-button>
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
