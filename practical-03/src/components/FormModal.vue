<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add Car Details"
      @show="resetModal"
      @hidden="resetModal"
      @hide="onHide"
      hide-footer="true"
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
  },
};
</script>
