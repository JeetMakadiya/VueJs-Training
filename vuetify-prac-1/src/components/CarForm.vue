<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <!-- Add Car Data Form -->
    <form @submit.prevent="handleSubmit(onSubmit)">
      <validation-provider
        v-slot="{ errors }"
        name="carName"
        rules="required|alpha_spaces"
      >
        <v-text-field
          v-model="car.carName"
          :error-messages="errors"
          label="Car Name"
          required
        >
        </v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="carDetails"
        rules="required|min:30|max:120"
      >
        <v-text-field
          v-model="car.carDetails"
          :error-messages="errors"
          label="Car Details"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="carPrice" rules="integer">
        <v-text-field
          v-model="car.carPrice"
          :error-messages="errors"
          label="Car Price"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="carImgURL"
        :rules="{
          required: true,
          regex:
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        }"
      >
        <v-text-field
          v-model="car.carImgURL"
          :error-messages="errors"
          label="Car Image URL"
          required
        ></v-text-field>
      </validation-provider>
      <v-btn color="primary" class="mr-4" type="submit" small>
        {{ formType === "add" ? "Add Car" : "Edit Car" }}
      </v-btn>
      <div>{{ formData }}</div>
    </form>
  </validation-observer>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  name: "CarForm",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      car: {
        carId: this.$store.getters["cars/getSelectedCarData"].carId || "",
        carName: this.$store.getters["cars/getSelectedCarData"].carName || "",
        carDetails:
          this.$store.getters["cars/getSelectedCarData"].carDetails || "",
        carPrice: this.$store.getters["cars/getSelectedCarData"].carPrice || "",
        carImgURL:
          this.$store.getters["cars/getSelectedCarData"].carImgURL || "",
      },
      disabledSubmitBtn: false,
    };
  },
  computed: {
    formType() {
      return this.$store.getters["ui/getDialogType"];
    },
    selectedCarData() {
      return this.$store.getters["cars/getSelectedCarData"];
    },
  },
  watch: {
    selectedCarData(newFormData) {
      this.car.carId = newFormData.carId;
      this.car.carName = newFormData.carName;
      this.car.carDetails = newFormData.carDetails;
      this.car.carPrice = newFormData.carPrice;
      this.car.carImgURL = newFormData.carImgURL;
    },
  },
  methods: {
    async onSubmit() {
      if (this.car.carId !== "") {
        let selectedCarData = {
          carId: this.carId,
          carName: this.carName,
          carDetails: this.carDetails,
          carPrice: this.carPrice,
          carImgURL: this.carImgURL,
        };
        // if for Edit Card
        await this.$store.dispatch("cars/updateCarData", this.car);
        await this.$store.dispatch("cars/getCarsData");
        selectedCarData = {
          carId: "",
          carName: "",
          carDetails: "",
          carPrice: "",
          carImgURL: "",
        };
        this.$store.commit("cars/setSelectedCarData", selectedCarData);
      } else {
        // else for Add New Card
        await this.$store.dispatch("cars/addNewCar", this.car);
        await this.$store.dispatch("cars/getCarsData");
      }
      // hide dialog
      this.$store.commit("ui/closeDialog");
    },
    animateBtn() {
      this.disabledSubmitBtn = true;
      setTimeout(() => {
        this.disabledSubmitBtn = false;
      }, 1500);
    },
  },
};
</script>
<style>
form {
  max-width: 500px;
  margin: 0 auto;
  text-align: left;
}
.form-group > label {
  font-weight: 600;
}
</style>
