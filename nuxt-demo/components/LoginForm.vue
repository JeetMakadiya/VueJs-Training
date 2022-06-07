<template>
  <b-container>
    <b-row class="mt-5">
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <AlertBox
          v-if="this.isLoading === false && this.errorMsg !== ''"
          showAlert="true"
          alertVariant="danger"
          :alertMessage="this.errorMsg"
        />
        <h1 class="text-center text-primary">Login</h1>
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider
              rules="required|email"
              name="userEmail"
              v-slot="{ errors, valid }"
            >
              <b-form-group label="E-mail" class="mb-2">
                <b-form-input
                  type="text"
                  v-model="user.userEmail"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Enter email"
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
                regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/,
              }"
              name="userPassword"
              v-slot="{ errors, valid }"
            >
              <b-form-group label="Password" class="mb-2">
                <b-form-input
                  type="text"
                  v-model="user.userPassword"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Enter password"
                >
                </b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <b-button block type="submit" variant="primary">Login</b-button>
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
  computed,
  defineComponent,
  useRouter,
  useStore,
  reactive,
} from "@nuxtjs/composition-api";

export default defineComponent({
  name: "LoginForm",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  setup(_, context) {
    const store = useStore();
    const router = useRouter();
    const user = reactive({
      userEmail: "",
      userPassword: "",
    });
    // Computed
    const isLoading = computed(() => {
      return store.getters["auth/getIsLoading"];
    });
    const errorMsg = computed(() => {
      return store.getters["auth/getErrorMsg"];
    });
    // Methods
    async function onSubmit() {
      let res = await store.dispatch("auth/loginUser", user);
      if (res === "success") {
        router.push("/Home");
      }
      user = {
        userEmail: "",
        userPassword: "",
      };
    }
    return { user, isLoading, errorMsg, onSubmit };
  },
});
</script>
