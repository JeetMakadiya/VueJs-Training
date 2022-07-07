<template>
  <b-container class="bv-example-row">
    <b-row class="mt-5">
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <AlertBox
          v-if="this.isLoading === false && this.errorMsg !== ''"
          showAlert="true"
          alertVariant="danger"
          :alertMessage="this.errorMsg"
        />
        <h1 class="text-center text-primary">Register</h1>
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(onSubmit)">
            <!-- Name Field -->
            <ValidationProvider
              rules="required|alpha_spaces"
              name="name"
              v-slot="{ errors, valid }"
            >
              <b-form-group label="User Name" class="mb-2">
                <b-form-input
                  type="text"
                  v-model="user.name"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Enter user name"
                >
                </b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <!-- Email Field -->
            <ValidationProvider
              rules="required|email"
              name="email"
              v-slot="{ errors, valid }"
            >
              <b-form-group label="E-mail" class="mb-2">
                <b-form-input
                  type="text"
                  v-model="user.email"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Enter email"
                >
                </b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <!-- Password Field -->
            <ValidationProvider
              :rules="{
                required: true,
                regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/,
              }"
              name="password"
              v-slot="{ errors, valid }"
            >
              <b-form-group label="Password" class="mb-2">
                <b-form-input
                  type="text"
                  v-model="user.password"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Enter password"
                >
                </b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <!-- Confirm Password Field -->
            <ValidationProvider
              :rules="{
                required: true,
                regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/,
              }"
              name="confirmPassword"
              v-slot="{ errors, valid }"
            >
              <b-form-group label="Confirm Password" class="mb-2">
                <b-form-input
                  type="text"
                  v-model="user.confirmPassword"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Confirm password"
                >
                </b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <!-- Role Field -->
            <ValidationProvider
              rules="required"
              name="role"
              v-slot="{ errors }"
            >
              <b-form-group label="Role" class="mb-2">
                <b-form-select
                  v-model="user.selectedRole"
                  :options="user.roleOptions"
                ></b-form-select>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <!-- gender field -->
            <ValidationProvider
              rules="required"
              name="gender"
              v-slot="{ errors }"
            >
              <b-form-group label="Gender" class="mb-2">
                <b-form-radio-group
                  v-model="user.selectedGender"
                  :options="user.genderOptions"
                  :aria-describedby="ariaDescribedby"
                  inline="true"
                ></b-form-radio-group>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <!-- age field -->
            <ValidationProvider
              rules="required|numeric"
              name="age"
              v-slot="{ errors, valid }"
            >
              <b-form-group label="Age" class="mb-2">
                <b-form-input
                  type="text"
                  v-model="user.age"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Enter age"
                >
                </b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider rules="required" name="dob" v-slot="{ errors }">
              <b-form-group label="Choose Date Of Birth" class="mb-2">
                <b-form-datepicker
                  v-model="user.dob"
                  class="mb-2"
                ></b-form-datepicker>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <b-button block type="submit" variant="primary">Register</b-button>
          </b-form>
        </ValidationObserver>
      </b-col>
      <b-col cols="4"></b-col>
    </b-row>
  </b-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import {
  defineComponent,
  reactive,
  computed,
  useStore,
} from "@nuxtjs/composition-api";

export default defineComponent({
  name: "RegisterForm",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  setup(_, context) {
    const store = useStore();
    const user = reactive({
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
    });
    // Computed
    const isLoading = computed(() => {
      return store.getters["auth/getIsLoading"];
    });
    const errorMsg = computed(() => {
      return store.getters["auth/getErrorMsg"];
    });
    // Methods
    function onSubmit() {
      store.dispatch("registerUser", user);
      user = {
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
    }
    return { user, isLoading, errorMsg, onSubmit };
  },
});
</script>
