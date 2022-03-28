<template>
  <div class="d-flex flex-wrap">
    <div class="mt-1 mb-1 ms-1 me-1" v-for="data in cardData" :key="data.title">
      <b-card
        :title="data.title"
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-img :src="data.image" alt="Image" bottom></b-card-img>
        <b-card-text>
          {{ data.description }}
        </b-card-text>
        <b-button href="#" variant="primary" @click="showCarInfo(data.price)"
          >Info</b-button
        >
      </b-card>
    </div>
  </div>
</template>

<script>
import cardData from "../assets/Data/CardData.json";
export default {
  name: "GalleryCard",
  data() {
    return {
      cardData: cardData,
    };
  },
  methods: {
    showCarInfo(price) {
      alert(`Car-Price :` + price);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
