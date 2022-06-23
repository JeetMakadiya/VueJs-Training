<template>
  <v-dialog
    transition="dialog-top-transition"
    v-model="openDialog"
    max-width="450"
  >
    <v-card>
      <v-toolbar color="primary" dark>
        {{ dialogType === "add" ? "Add Car Data" : "Edit Car Data" }}
      </v-toolbar>
      <v-card-text>
        <CarForm v-on="$listeners" />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text @click="closeDialog" small>Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CarForm from "./CarForm.vue";
export default {
  data() {
    return {
      name: "FormModal",
    };
  },
  components: { CarForm },
  computed: {
    openDialog() {
      return this.$store.getters["ui/getIsDialogOpen"];
    },
    dialogType() {
      return this.$store.getters["ui/getDialogType"];
    },
  },
  methods: {
    closeDialog() {
      this.$store.commit("ui/closeDialog");
      let selectedCarData = {
        carId: "",
        carName: "",
        carDetails: "",
        carPrice: "",
        carImgURL: "",
      };
      this.$store.commit("cars/setSelectedCarData", selectedCarData);
    },
  },
};
</script>
<style>
@import "animate.css";
.hidden {
  display: none !important;
}
</style>
