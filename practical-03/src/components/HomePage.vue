<template>
  <div>
    <NavBar />
    <section class="container-fluid">
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
            @editCard="editCard(data)"
            @deleteCard="deleteCard(data)"
          />
        </div>
      </div>
    </section>
    <FormModal :formData="selectedCardData" />
  </div>
</template>

<script>
import GalleryCard from "./GalleryCard";
import cardData from "../assets/Data/CardData.json";
import FormModal from "./FormModal.vue";

export default {
  name: "HomePage",
  components: {
    GalleryCard,
    FormModal,
  },
  data() {
    return {
      cardData: cardData,
      selectedCardData: {
        // carName: "",
        // carDetails: "",
        // carPrice: "",
        // carImgURL: "",
      },
    };
  },
  methods: {
    showCarPrice(price) {
      alert(`Car Price : ${price}`);
    },
    editCard(data) {
      this.selectedCardData = {
        carId: data.id,
        carName: data.title,
        carDetails: data.description,
        carPrice: data.price,
        carImgURL: data.image,
      };
      this.$bvModal.show("modal-prevent-closing");
      console.log(data);
    },
    deleteCard(data) {
      let cardItems = this.cardData.filter((item) => item.id !== data.id);
      this.cardData = cardItems;
      alert("Deleted : " + data.title);
    },
  },
  mounted() {
    // add new card
    this.$root.$on("form-data", (data) => {
      if (data.carId !== "") {
        let id = data.carId;
        let index = this.cardData.findIndex((item) => item.id === id);
        this.cardData[index].title = data.carName;
        this.cardData[index].image = data.carImgURL;
        this.cardData[index].description = data.carDetails;
        this.cardData[index].price = data.carPrice;
      } else {
        let carDetails = {
          id: new Date().getTime().toString(),
          title: data.carName,
          image: data.carImgURL,
          description: data.carDetails,
          price: data.carPrice,
        };
        this.cardData.push(carDetails);
      }
    });
  },
};
</script>

<style>
.galleryCardWrapper {
  height: calc();
}
</style>
