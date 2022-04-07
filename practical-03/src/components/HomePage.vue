<template>
  <div>
    <NavBar />
    <section>
      <b-container class="bv-example-row">
        <b-row class="pt-5">
          <b-col
            cols="3"
            class="d-flex align-items-stretch ms-2 me-2"
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
          </b-col>
        </b-row>
      </b-container>
    </section>
    <FormModal
      :formData="selectedCardData"
      @submitted-form-data="handleSubmittedFormData"
    />
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
        carId: "",
        carName: "",
        carDetails: "",
        carPrice: "",
        carImgURL: "",
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
    handleSubmittedFormData(data) {
      console.log(data);
      if (data.carId !== "") {
        // Edit Card
        let id = data.carId;
        let index = this.cardData.findIndex((item) => item.id === id);
        this.cardData[index].title = data.carName;
        this.cardData[index].image = data.carImgURL;
        this.cardData[index].description = data.carDetails;
        this.cardData[index].price = data.carPrice;
        this.selectedCardData = {
          carId: "",
          carName: "",
          carDetails: "",
          carPrice: "",
          carImgURL: "",
        };
      } else {
        // Add New Card
        let carDetails = {
          id: new Date().getTime().toString(),
          title: data.carName,
          image: data.carImgURL,
          description: data.carDetails,
          price: data.carPrice,
        };
        this.cardData.push(carDetails);
      }
    },
  },
  mounted() {
    // this.$root.$on("form-data", (data) => {
    //   if (data.carId !== "") {
    //     // Edit Card
    //     let id = data.carId;
    //     let index = this.cardData.findIndex((item) => item.id === id);
    //     this.cardData[index].title = data.carName;
    //     this.cardData[index].image = data.carImgURL;
    //     this.cardData[index].description = data.carDetails;
    //     this.cardData[index].price = data.carPrice;
    //     this.selectedCardData = {
    //       carId: "",
    //       carName: "",
    //       carDetails: "",
    //       carPrice: "",
    //       carImgURL: "",
    //     };
    //   } else {
    //     // Add New Card
    //     let carDetails = {
    //       id: new Date().getTime().toString(),
    //       title: data.carName,
    //       image: data.carImgURL,
    //       description: data.carDetails,
    //       price: data.carPrice,
    //     };
    //     this.cardData.push(carDetails);
    //   }
    // });
  },
};
</script>

<style>
.galleryCardWrapper {
  height: calc();
}
</style>
