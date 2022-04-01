<template>
  <ValidationObserver ref="observer">
    <b-form
      slot-scope="{ validate }"
      @submit.prevent="validate().then(handleSubmit)"
    >
      <ValidationProvider rules="required|alpha_num" name="carName">
        <b-form-group
          slot-scope="{ valid, errors }"
          label="Car Name"
          class="mb-2"
        >
          <b-form-input
            type="text"
            v-model="user.carName"
            :state="errors[0] ? false : valid ? true : null"
            placeholder="Enter car name"
          >
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required" name="carDetails">
        <b-form-group slot-scope="{ errors }" label="Car Details" class="mb-2">
          <b-form-textarea
            v-model="user.carDetails"
            placeholder="Enter Car Details"
          >
          </b-form-textarea>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider rules="required|integer" name="carPrice">
        <b-form-group
          slot-scope="{ valid, errors }"
          label="Car Price"
          class="mb-2"
        >
          <b-form-input
            type="text"
            v-model="user.carPrice"
            :state="errors[0] ? false : valid ? true : null"
            placeholder="Enter car price"
          >
          </b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider rules="required" name="carImgURL">
        <b-form-group
          slot-scope="{ valid, errors }"
          label="Car Image URL"
          class="mb-4"
        >
          <b-form-input
            type="text"
            v-model="user.carImgURL"
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
  data() {
    return {
      user: {
        carName: "",
        carDetails: "",
        carPrice: "",
        carImgURL: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.user);
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
