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
      <b-card
        v-if="this.errorMsg === ''"
        no-body
        class="overflow-hidden"
        style="max-width: 1040px"
      >
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              :src="this.carData.image"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="this.carData.name">
              <b-card-text>
                {{ this.carData.details }}
              </b-card-text>
              <b-card-text>
                {{ this.carData.price }}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div class="d-flex justify-content-center mt-5">
      <b-button
        href="#"
        variant="primary"
        class="me-3"
        @click.prevent="editCar"
      >
        Edit
      </b-button>
      <b-button
        href="#"
        variant="primary"
        class="me-3"
        @click.prevent="deleteCar()"
      >
        Delete
      </b-button>
      <NuxtLink to="/Home" class="btn btn-primary">
        Back To Home Page
      </NuxtLink>
    </div>
    <FormModal :formData="this.selectedCarData" />
  </section>
</template>
<script>
import {
  defineComponent,
  computed,
  ref,
  useStore,
  useRoute,
  useRouter,
} from "@nuxtjs/composition-api";

export default defineComponent({
  name: "CarDetailsPage",
  setup(_, context) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    // Computed
    const carData = computed(() => {
      return store.getters["cars/getCarData"];
    });
    const selectedCarData = computed(() => {
      return store.getters["cars/getSelectedCarData"];
    });
    const isLoading = computed(() => {
      return store.getters["cars/getIsLoading"];
    });
    const errorMsg = computed(() => {
      return store.getters["cars/getErrorMsg"];
    });
    // Methods
    async function editCar() {
      let selectedData = {
        carId: carData.value.id,
        carName: carData.value.name,
        carDetails: carData.value.details,
        carPrice: carData.value.price,
        carImgURL: carData.value.image,
      };
      await store.commit("cars/setSelectedCarData", selectedData);
      context.root.$bvModal.show("modal-prevent-closing");
    }
    async function deleteCar() {
      let res = await store.dispatch("cars/deleteCar", this.carData);
      if (res !== "error") {
        router.push("/Home");
        store.dispatch("cars/getCarsData");
      }
    }
    // Created
    const id = ref(route.value.params.carId);
    store.dispatch("cars/getCarData", id.value);
    return {
      carData,
      selectedCarData,
      isLoading,
      errorMsg,
      editCar,
      deleteCar,
    };
  },
});
</script>
