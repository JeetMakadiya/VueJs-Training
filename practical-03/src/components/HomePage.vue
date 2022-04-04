<template>
  <div>
    <NavBar />
    <section class="container">
      <div class="pt-5 row">
        <div
          class="col-3 d-flex align-items-stretch ms-2 me-2"
          v-for="data in cardData"
          :key="data.id"
        >
          <GalleryCard
            :cardId="data.id"
            :cardTitle="data.title"
            :cardImage="data.image"
            :cardDescription="data.description"
            :price="data.price"
            @showCarPrice="showCarPrice"
          />
        </div>
      </div>
      <!-- <FormModal :formData="selectedCard" /> -->
    </section>
  </div>
</template>

<script>
import GalleryCard from "./GalleryCard";
import cardData from "../assets/Data/CardData.json";

export default {
  name: "HomePage",
  components: {
    GalleryCard,
  },
  data() {
    return {
      cardData: cardData,
      selectedCard: {},
    };
  },
  methods: {
    showCarPrice(price) {
      alert(`Car Price : ${price}`);
    },
    editModalOpen(id) {
      this.selectedCard = cardData.find((item) => item.id === id);
    },
  },
};
</script>

<style>
.galleryCardWrapper {
  height: calc();
}
</style>
