<template>
  <section>
    <b-container>
      <div class="mt-5">
        <AlertBox
          v-if="this.isLoading === false && this.errorMsg !== ''"
          showAlert="true"
          alertVariant="danger"
          :alertMessage="this.errorMsg"
        />
        <AlertBox
          v-else-if="this.isLoading === false && this.successMsg !== ''"
          showAlert="true"
          alertVariant="success"
          :alertMessage="this.successMsg"
        />
      </div>
      <b-row class="pt-3 justify-content-md-center">
        <b-col cols="3" v-if="this.isLoading === true">Loading...</b-col>
        <b-col
          cols="3"
          class="d-flex align-items-stretch ms-2 me-2"
          v-for="data in this.carsData"
          :key="data.id"
          v-else
        >
          <GalleryCard
            :cardId="data.id"
            :cardTitle="data.title"
            :cardImage="data.image"
            :cardDescription="data.description"
            :price="data.price"
            @showCarDetails="showCarDetails"
            @editCard="editCard(data)"
            @deleteCard="deleteCard(data)"
          />
        </b-col>
      </b-row>
    </b-container>
    <FormModal :formData="this.selectedCarData" />
  </section>
</template>
<script>
import {
  defineComponent,
  computed,
  useStore,
  useRouter,
  onMounted,
} from "@nuxtjs/composition-api";

export default defineComponent({
  name: "GalleryCardWrapper",
  setup(_, context) {
    const store = useStore();
    const router = useRouter();
    // Computed
    const carsData = computed(() => {
      return store.getters["cars/getCarsData"];
    });
    const selectedCarData = computed(() => {
      return store.getters["cars/getSelectedCarData"];
    });
    const isLoading = computed(() => {
      return store.getters["cars/getIsLoading"];
    });
    const successMsg = computed(() => {
      return store.getters["cars/getSuccessMsg"];
    });
    const errorMsg = computed(() => {
      return store.getters["cars/getErrorMsg"];
    });
    // Methods
    // func. to show car price in alert box
    function showCarDetails(id) {
      router.push({
        name: "CarDetails",
        params: { carId: id },
      });
    }
    // func. to Edit Card
    function editCard(data) {
      let selectedCarData = {
        carId: data.id,
        carName: data.title,
        carDetails: data.description,
        carPrice: data.price,
        carImgURL: data.image,
      };
      store.commit("cars/setSelectedCarData", selectedCarData);
      context.root.$bvModal.show("modal-prevent-closing");
    }
    // Func. to Delete Card
    async function deleteCard(data) {
      await store.dispatch("cars/deleteCar", data);
      alert("Deleted : " + data.title);
      await store.dispatch("cars/getCarsData");
    }
    onMounted(() => {
      store.dispatch("cars/getCarsData");
    });
    return {
      carsData,
      selectedCarData,
      isLoading,
      successMsg,
      errorMsg,
      showCarDetails,
      editCard,
      deleteCard,
    };
  },
});
</script>
