<template>
  <div>
    <NavBar />
    <section style="height: calc(100vh - 14vh)">
      <div class="pt-5 d-flex justify-content-center">
        <div class="ms-2 me-2" v-for="data in cardData" :key="data.id">
          <GalleryCard
            :cardTitle="data.title"
            :cardImage="data.image"
            :cardDescription="data.description"
            :price="data.price"
            @showCarPrice="showCarPrice"
          />
        </div>
      </div>
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
    };
  },
  methods: {
    showCarPrice(price) {
      alert(`Car Price : ${price}`);
    },
  },
};
</script>

<style>
.galleryCardWrapper {
  height: calc();
}
</style>
