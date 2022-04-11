<template>
  <div>
    <NavBar />
    <section>
      <b-container class="bv-example-row">
        <b-row class="pt-5 justify-content-md-center">
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
      @submittedFormData="handleSubmittedFormData"
    />
  </div>
</template>

<script>
import GalleryCard from "./GalleryCard";
// import cardData from "../assets/Data/CardData.json";
import FormModal from "./FormModal.vue";
import Axios from "axios";

export default {
  name: "HomePage",
  components: {
    GalleryCard,
    FormModal,
  },
  data() {
    return {
      cardData: [],
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
    // func. to show car price in alert box
    showCarPrice(price) {
      alert(`Car Price : ${price}`);
    },
    // func. to Edit Card
    editCard(data) {
      this.selectedCardData = {
        carId: data.id,
        carName: data.title,
        carDetails: data.description,
        carPrice: data.price,
        carImgURL: data.image,
      };
      this.$bvModal.show("modal-prevent-closing");
    },
    // Func. to Delete Card
    deleteCard(data) {
      this.deleteCarData(data);
      this.getCarData();
      alert("Deleted : " + data.title);
    },
    // Func. to handle submitted form data
    // Here If condition is for Edit Card and Else condition is for Add new card
    handleSubmittedFormData(data) {
      console.log(data);
      if (data.carId !== "") {
        // If for Edit Card
        this.updateCarData(data);
        this.getCarData();
        // this.selectedCardData = {
        //   carId: "",
        //   carName: "",
        //   carDetails: "",
        //   carPrice: "",
        //   carImgURL: "",
        // };
      } else {
        // Else for Add New Card
        this.addCarData(data);
        this.getCarData();
      }
    },
    // Func. to get card data from API.
    getCarData() {
      Axios.get("https://testapi.io/api/dartya/resource/cardata").then(
        (response) => {
          this.formatCarData(response.data.data);
        }
      );
    },
    formatCarData(data) {
      this.cardData = data.map((item) => {
        return {
          id: item.id,
          title: item.name,
          image: item.image,
          description: item.details,
          price: item.price,
        };
      });
    },
    // Func. to ADD card data to API.
    addCarData(data) {
      Axios.post("https://testapi.io/api/dartya/resource/cardata", {
        name: data.carName,
        details: data.carDetails,
        image: data.carImgURL,
        price: data.carPrice,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // Func. to Update specific data in API
    updateCarData(data) {
      Axios.put(
        `https://testapi.io/api/dartya/resource/cardata/${data.carId}`,
        {
          name: data.carName,
          details: data.carDetails,
          image: data.carImgURL,
          price: data.carPrice,
        }
      )
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // Func. to delete specific data in API
    deleteCarData(data) {
      Axios.delete(`https://testapi.io/api/dartya/resource/cardata/${data.id}`)
        .then((res) => {
          console.log(res);
          this.$forceUpdate();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getCarData();
  },
};
</script>

<style>
.galleryCardWrapper {
  height: calc();
}
</style>
