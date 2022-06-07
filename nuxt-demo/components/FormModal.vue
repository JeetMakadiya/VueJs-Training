<template>
  <div v-if="true">
    <b-modal
      id="modal-prevent-closing"
      ref="formModalRef"
      title="Add Car Details"
      @shown="shownModal"
      @hide="onHide"
      hide-footer
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
import { defineComponent, useStore } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "FormModal",
  props: ["formData"],
  setup(props) {
    const store = useStore();
    // Methods
    function onHide() {
      let selectedCarData = {
        carId: "",
        carName: "",
        carDetails: "",
        carPrice: "",
        carImgURL: "",
      };
      store.commit("cars/setSelectedCarData", selectedCarData);
    }
    function shownModal() {
      let modal = document.getElementById("modal-prevent-closing");
      modal.classList.remove("hidden");
      modal.classList.add("slideInDown");
      modal.classList.add("animated");
    }
    return { onHide, shownModal };
  },
});
</script>
<style>
@import "animate.css";
.hidden {
  display: none !important;
}
</style>
