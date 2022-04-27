<template>
  <div v-if="true">
    <b-modal
      id="modal-prevent-closing"
      ref="formModal"
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
      let modal = this.$refs.formModal;
      modal.parentElement.parentElement.classList.remove("hidden");
      modal.classList.add("slideInLeft");
      modal.classList.add("animated");
    },
    hideModal() {},
  },
};
</script>
<style>
@import "animate.css";
</style>
