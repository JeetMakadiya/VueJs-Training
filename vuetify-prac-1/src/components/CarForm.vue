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
      <v-btn color="primary" class="mr-4" type="submit" small> Add Car </v-btn>
      <div>{{ car }}</div>
    </form>
    <!-- Edit Car Data Form -->
    <!-- <form @submit.prevent="handleSubmit(onSubmit)" v-if="formType === 'edit'">
      <validation-provider
        v-slot="{ errors }"
        name="carName"
        rules="required|alpha_spaces"
      >
        <v-text-field
          v-model="carName"
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
          v-model="carDetails"
          :error-messages="errors"
          label="Car Details"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="carPrice" rules="integer">
        <v-text-field
          v-model="carPrice"
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
          v-model="carImgURL"
          :error-messages="errors"
          label="Car Image URL"
          required
        ></v-text-field>
      </validation-provider>
      <v-btn color="primary" class="mr-4" type="submit" small> Edit Car </v-btn>
    </form> -->
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
  props: ["formData"],
  data() {
    return {
      car: {
        carId: this.$store.state.cars.selectedCarData.carId || "",
        carName: this.$store.state.cars.selectedCarData.carName || "",
        carDetails: this.$store.state.cars.selectedCarData.carDetails || "",
        carPrice: this.$store.state.cars.selectedCarData.carPrice || "",
        carImgURL: this.$store.state.cars.selectedCarData.carImgURL || "",
      },
      disabledSubmitBtn: false,
    };
  },
  computed: {
    formType() {
      return this.$store.getters["ui/getDialogType"];
    },
    // selectedCarData() {
    //   return this.$store.getters["cars/getSelectedCarData"];
    // },
    carId: {
      get() {
        return this.$store.state.cars.selectedCarData.carId;
      },
      set(newValue) {
        this.car.carId = newValue;
      },
    },
    carName: {
      get() {
        return this.$store.state.cars.selectedCarData.carName;
      },
      set(newValue) {
        this.car.carName = newValue;
      },
    },
    carDetails: {
      get() {
        return this.$store.state.cars.selectedCarData.carDetails;
      },
      set(newValue) {
        this.car.carDetails = newValue;
      },
    },
    carPrice: {
      get() {
        return this.$store.state.cars.selectedCarData.carPrice;
      },
      set(newValue) {
        this.car.carPrice = newValue;
      },
    },
    carImgURL: {
      get() {
        return this.$store.state.cars.selectedCarData.carImgURL;
      },
      set(newValue) {
        this.car.carImgURL = newValue;
      },
    },
  },
  methods: {
    // updateCarData() {
    //   this.car.carId = this.selectedCarData.carId;
    //   this.car.carName = this.selectedCarData.carName;
    //   this.car.carDetails = this.selectedCarData.carDetails;
    //   this.car.carPrice = this.selectedCarData.carPrice;
    //   this.car.carImgURL = this.selectedCarData.carImgURL;
    // },
    async onSubmit() {
      if (this.car.carId !== "") {
        let updatedCarData = {
          carId: this.carId,
          carName: this.carName,
          carDetails: this.carDetails,
          carPrice: this.carPrice,
          carImgURL: this.carImgURL,
        };
        // if for Edit Card
        await this.$store.dispatch("cars/updateCarData", updatedCarData);
        await this.$store.dispatch("cars/getCarsData");
        updatedCarData = {
          carId: "",
          carName: "",
          carDetails: "",
          carPrice: "",
          carImgURL: "",
        };
        this.$store.commit("cars/setSelectedCarData", updatedCarData);
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
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
