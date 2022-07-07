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
          <h1 class="text-center text-primary">Login</h1>
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <validation-provider
                v-slot="{ errors }"
                name="userEmail"
                rules="required|email"
              >
                <v-text-field
                  v-model="user.userEmail"
                  :error-messages="errors"
                  label="E-mail"
                  required
                ></v-text-field>
              </validation-provider>
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
                  v-model="user.userPassword"
                  :error-messages="errors"
                  label="Password"
                  required
                ></v-text-field>
              </validation-provider>
              <v-btn class="mr-4" type="submit" color="primary"> Login </v-btn>
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
  name: "LoginForm",
  components: {
    ValidationObserver,
    ValidationProvider,
    AlertBox,
  },
  data() {
    return {
      user: {
        userEmail: "",
        userPassword: "",
      },
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
    async onSubmit() {
      await this.$store.dispatch("auth/loginUser", this.user);
      this.user = {
        userEmail: "",
        userPassword: "",
      };
    },
  },
};
</script>
