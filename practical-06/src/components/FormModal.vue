<template>
  <div v-if="true">
    <b-modal
      id="modal-prevent-closing"
      ref="formModalRef"
      title="Add Car Details"
      @shown="shownModal"
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
      let modal = document.getElementById("modal-prevent-closing");
      modal.parentElement.parentElement.classList.remove("hidden");
      modal.classList.add("slideInDown");
      modal.classList.add("animated");
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
