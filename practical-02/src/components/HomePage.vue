<template>
  <div>
    <NavBar />
    <div class="d-flex flex-wrap">
      <GalleryCard
        v-for="data in cardData"
        :key="data.id"
        :cardTitle="data.title"
        :cardImage="data.image"
        :cardDescription="data.description"
        :price="data.price"
        @showCarPrice="showCarPrice"
      />
    </div>
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
