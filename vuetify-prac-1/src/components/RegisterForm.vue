<template>
  <v-container class="lighten-5">
    <v-row no-gutters>
      <v-col cols="4" sm="4"></v-col>
      <v-col cols="4" sm="4">
        <AlertBox
          v-if="this.isLoading === false && this.errorMsg !== ''"
          showAlert="true"
          alertVariant="danger"
          :alertMessage="this.errorMsg"
        />
        <v-card class="pa-2 mt-5" elevation="4" outlined tile>
          <h1 class="text-center text-primary">Register</h1>
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <!-- username field -->
              <validation-provider
                v-slot="{ errors }"
                name="userEmail"
                rules="required|alpha_spaces"
              >
                <v-text-field
                  v-model="user.name"
                  :error-messages="errors"
                  label="Name"
                  required
                ></v-text-field>
              </validation-provider>
              <!-- email field -->
              <validation-provider
                v-slot="{ errors }"
                name="userEmail"
                rules="required|email"
              >
                <v-text-field
                  v-model="user.email"
                  :error-messages="errors"
                  label="E-mail"
                  required
                ></v-text-field>
              </validation-provider>
              <!-- password field -->
              <validation-provider
                v-slot="{ errors }"
                name="userPassword"
                :rules="{
                  required: true,
                  regex:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/,
                }"
              >
                <v-text-field
                  v-model="user.password"
                  :error-messages="errors"
                  label="Password"
                  required
                ></v-text-field>
              </validation-provider>
              <!-- confirm password field -->
              <validation-provider
                v-slot="{ errors }"
                name="userPassword"
                :rules="{
                  required: true,
                  regex:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/,
                }"
              >
                <v-text-field
                  v-model="user.confirmPassword"
                  :error-messages="errors"
                  label="Confirm Password"
                  required
                ></v-text-field>
              </validation-provider>
              <!-- select role field -->
              <validation-provider
                v-slot="{ errors }"
                name="role"
                rules="required"
              >
                <v-select
                  v-model="user.selectedRole"
                  :items="user.roleOptions"
                  :error-messages="errors"
                  label="Role"
                  data-vv-name="select"
                  required
                ></v-select>
              </validation-provider>
              <!-- select gender field -->
              <validation-provider
                v-slot="{ errors }"
                name="gender"
                rules="required"
              >
                <v-select
                  v-model="user.selectedGender"
                  :items="user.genderOptions"
                  :error-messages="errors"
                  label="Gender"
                  data-vv-name="select"
                  required
                ></v-select>
              </validation-provider>
              <!-- age field -->
              <validation-provider
                v-slot="{ errors }"
                name="age"
                rules="required|numeric"
              >
                <v-text-field
                  v-model="user.age"
                  :error-messages="errors"
                  label="Age"
                  required
                ></v-text-field>
              </validation-provider>
              <!-- date field -->
              <validation-provider name="dob" rules="required">
                <v-menu
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="user.dob"
                      label="Pick Date of Birth"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="user.dob"
                    @input="dateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </validation-provider>
              <v-btn class="mr-4" type="submit" color="primary">
                Register
              </v-btn>
            </form>
          </validation-observer>
        </v-card>
      </v-col>
      <v-col cols="4" sm="4"></v-col>
    </v-row>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import AlertBox from "./AlertBox.vue";
export default {
  name: "RegisterForm",
  components: {
    ValidationObserver,
    ValidationProvider,
    AlertBox,
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        selectedRole: null,
        age: "",
        dob: "",
        roleOptions: [
          { value: null, text: "Select Role" },
          { value: "admin", text: "Admin" },
          { value: "employee", text: "Employee" },
          { value: "Customer", text: "Customer" },
        ],
        selectedGender: "male",
        genderOptions: [
          { value: "male", text: "Male" },
          { value: "female", text: "Female" },
          { value: "other", text: "Other" },
        ],
      },
      dateMenu: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters["auth/getIsLoading"];
    },
    errorMsg() {
      return this.$store.getters["auth/getErrorMsg"];
    },
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("registerUser", this.user);
      this.user = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        selectedRole: null,
        gender: "",
        age: "",
        dob: "",
        roleOptions: [
          { value: null, text: "Select Role" },
          { value: "admin", text: "Admin" },
          { value: "employee", text: "Employee" },
          { value: "Customer", text: "Customer" },
        ],
        selectedGender: "male",
        genderOptions: [
          { value: "male", text: "Male" },
          { value: "female", text: "Female" },
          { value: "other", text: "Other" },
        ],
      };
    },
  },
};
</script>
