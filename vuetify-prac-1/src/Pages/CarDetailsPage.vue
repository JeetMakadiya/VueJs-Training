<template>
  <section>
    <div class="m-auto mt-5 w-75">
      <AlertBox
        v-if="this.isLoading === false && this.errorMsg !== ''"
        showAlert="true"
        alertVariant="danger"
        :alertMessage="this.errorMsg"
      />
    </div>
    <div class="d-flex justify-content-center mt-5">
      <div v-if="this.isLoading === true">Loading...</div>
      <v-card class="mx-auto" min-width="550" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">
              {{ this.carData.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ this.carData.details }}
            </v-list-item-subtitle>
            <div class="text-overline mb-4">
              Price : {{ this.carData.price }}
            </div>
          </v-list-item-content>
          <v-list-item-avatar tile size="220" color="grey">
            <v-img :src="this.carData.image"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
          <v-btn small color="primary" @click.prevent="editCar"> Edit </v-btn>
          <v-btn small color="primary" @click.prevent="deleteCar()">
            Delete
          </v-btn>
          <v-btn small color="primary" :to="{ name: 'home' }">
            Back To Home Page
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <FormModal />
  </section>
</template>
<script>
import AlertBox from "../components/AlertBox.vue";
import FormModal from "../components/FormModal.vue";
export default {
  name: "CarDetailsPage",
  components: { AlertBox, FormModal },
  computed: {
    carData() {
      return this.$store.getters["cars/getCarData"];
    },
    selectedCarData() {
      return this.$store.getters["cars/getSelectedCarData"];
    },
    isLoading() {
      return this.$store.getters["cars/getIsLoading"];
    },
    errorMsg() {
      return this.$store.getters["cars/getErrorMsg"];
    },
  },
  methods: {
    async editCar() {
      let selectedData = {
        carId: this.carData.id,
        carName: this.carData.name,
        carDetails: this.carData.details,
        carPrice: this.carData.price,
        carImgURL: this.carData.image,
      };
      await this.$store.commit("cars/setSelectedCarData", selectedData);
      this.$store.commit("ui/openDialog", { type: "edit" });
    },
    async deleteCar() {
      let res = await this.$store.dispatch("cars/deleteCar", this.carData);
      if (res !== "error") {
        this.$router.push({ name: "home" });
        this.$store.dispatch("cars/getCarsData");
      }
    },
  },
  created() {
    const id = this.$route.params.carId;
    this.$store.dispatch("cars/getCarData", id);
  },
};
</script>
