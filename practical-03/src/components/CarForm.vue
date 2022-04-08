<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider
        rules="required|alpha_spaces"
        name="carName"
        v-slot="{ errors }"
      >
        <b-form-group label="Car Name" class="mb-2">
          <b-form-input
            type="text"
            v-model="car.carName"
            :state="errors[0] ? false : valid ? true : null"
            placeholder="Enter car name"
          >
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider
        rules="required|min:30|max:120"
        name="carDetails"
        v-slot="{ errors }"
      >
        <b-form-group label="Car Details" class="mb-2">
          <b-form-textarea
            v-model="car.carDetails"
            placeholder="Enter Car Details"
            :state="errors[0] ? false : valid ? true : null"
          >
          </b-form-textarea>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider
        rules="required|integer"
        name="carPrice"
        v-slot="{ errors }"
      >
        <b-form-group label="Car Price" class="mb-2">
          <b-form-input
            type="text"
            v-model="car.carPrice"
            :state="errors[0] ? false : valid ? true : null"
            placeholder="Enter car price"
          >
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        :rules="{
          required: true,
          regex:
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        }"
        name="carImgURL"
        v-slot="{ errors }"
      >
        <b-form-group label="Car Image URL" class="mb-4">
          <b-form-input
            type="text"
            v-model="car.carImgURL"
            :state="errors[0] ? false : valid ? true : null"
            placeholder="Enter car image URL"
          >
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <b-button block type="submit" variant="primary">Submit</b-button>
    </b-form>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  name: "CarForm",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: ["modalId", "formData"],
  data() {
    return {
      car: {
        carId: this.formData.formData.carId || "",
        carName: this.formData.formData.carName || "",
        carDetails: this.formData.formData.carDetails || "",
        carPrice: this.formData.formData.carPrice || "",
        carImgURL: this.formData.formData.carImgURL || "",
      },
      formModalId: this.modalId,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.car);
      this.$emit("submittedFormData", this.car);
      this.$bvModal.hide(this.formModalId);
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
