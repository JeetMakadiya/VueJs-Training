<template>
  <nav
    class="ps-5 pe-5 bg-primary d-flex justify-content-between align-items-center"
    style="height: 14vh"
  >
    <h1 class="text-center text-light">{{ navBarText }}</h1>
    <FormModal />
  </nav>
</template>
<script>
// import AddCarBtn from "./AddCarBtn.vue";
import FormModal from "./FormModal.vue";
export default {
  name: "NavBar",
  components: {
    // AddCarBtn,
    FormModal,
  },
  data() {
    return {
      navBarText: "Car Showroom",
    };
  },
};
</script>
