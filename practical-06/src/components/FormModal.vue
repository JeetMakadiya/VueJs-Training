<template>
  <div v-if="true">
    <b-modal
      id="modal-prevent-closing"
      ref="formModalRef"
      title="Add Car Details"
      @shown="shownModal"
      @hidden="hideModal"
      @hide="onHide"
      hide-footer="true"
      no-fade
    >
      <CarForm
        modalId="modal-prevent-closing"
        :formData="$props"
        v-on="$listeners"
      />
    </b-modal>
  </div>
</template>

<script>
import CarForm from "./CarForm.vue";
export default {
  data() {
    return {
      name: "FormModal",
      modalTitle: "",
    };
  },
  props: ["formData"],
  components: { CarForm },
  methods: {
    onHide() {
      this.$parent.selectedCardData = {
        carId: "",
        carName: "",
        carDetails: "",
        carPrice: "",
        carImgURL: "",
      };
    },
    shownModal() {
      // let modal = this.$refs.formModal;
      let modal = document.getElementById("modal-prevent-closing");
      modal.parentElement.parentElement.classList.remove("hidden");
      modal.classList.add("slideInDown");
      modal.classList.add("animated");
    },
    hideModal(event) {
      let modal = document.getElementById("modal-prevent-closing");
      event.preventDefault();
      modal.classList.add("slideInDown");
      // // setTimeout(() => {
      // this.$refs.formModalRef.hide();
      // modal.parentElement.parentElement.classList.add("hidden");
      // //   console.log("test");
      // // }, 1000);
    },
  },
};
</script>
<style>
@import "animate.css";
.hidden {
  display: none;
}
</style>
