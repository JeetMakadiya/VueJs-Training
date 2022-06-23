<template>
  <section>
    <v-container>
      <div class="mt-5">
        <AlertBox
          v-if="this.isLoading === false && this.errorMsg !== ''"
          showAlert="true"
          alertVariant="error"
          :alertMessage="this.errorMsg"
        />
        <AlertBox
          v-else-if="this.isLoading === false && this.successMsg !== ''"
          showAlert="true"
          alertVariant="success"
          :alertMessage="this.successMsg"
        />
      </div>
      <v-row class="pt-3 justify-content-md-center">
        <v-col cols="3" v-if="this.isLoading === true">Loading...</v-col>
        <v-col
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
        </v-col>
      </v-row>
    </v-container>
    <FormModal />
  </section>
</template>
<script>
import GalleryCard from "./GalleryCard.vue";
import AlertBox from "./AlertBox.vue";
import FormModal from "./FormModal.vue";
import GalleryCardWrapperMixin from "../mixins/GalleryCardWrapperMixin";
export default {
  name: "GalleryCardWrapper",
  components: {
    GalleryCard,
    FormModal,
    AlertBox,
  },
  mixins: [GalleryCardWrapperMixin],
  mounted() {
    this.$store.dispatch("cars/getCarsData");
  },
};
</script>
