<template>
  <div>
    <NavBar />
    <section>
      <b-container class="bv-example-row">
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
import FormModal from "./FormModal.vue";
import AlertBox from "./AlertBox.vue";
import Axios from "axios";

export default {
  name: "HomePage",
  components: {
    GalleryCard,
    FormModal,
    AlertBox,
  },
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      cardData: [],
      selectedCardData: {
        carId: "",
        carName: "",
        carDetails: "",
        carPrice: "",
        carImgURL: "",
      },
      isLoading: false,
      successMsg: "",
      errorMsg: "",
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
    async deleteCard(data) {
      await this.deleteCarData(data);
      alert("Deleted : " + data.title);
      // this.showAlert();
      await this.getCarData();
    },
    // Func. to handle submitted form data
    // Here If condition is for Edit Card and Else condition is for Add new card
    async handleSubmittedFormData(data) {
      if (data.carId !== "") {
        // if for Edit Card
        await this.updateCarData(data);
        await this.getCarData();
        this.selectedCardData = {
          carId: "",
          carName: "",
          carDetails: "",
          carPrice: "",
          carImgURL: "",
        };
      } else {
        // else for Add New Card
        await this.addCarData(data);
        await this.getCarData();
      }
    },
    // Func. to get card data from API.
    async getCarData() {
      try {
        let response = await Axios.get(
          "https://testapi.io/api/dartya/resource/cardata"
        );
        await this.formatCarData(response.data.data);
      } catch (error) {}
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
    async addCarData(data) {
      this.isLoading = true;
      try {
        await Axios.post("https://testapi.io/api/dartya/resource/cardata", {
          name: data.carName,
          details: data.carDetails,
          image: data.carImgURL,
          price: data.carPrice,
        });
        this.isLoading = false;
        this.successMsg = "Car data added successfully!";
      } catch (error) {
        this.isLoading = false;
        this.errorMsg = "Car data not added!";
      }
    },
    // Func. to Update specific data in API
    async updateCarData(data) {
      this.isLoading = true;
      try {
        await Axios.put(
          `https://testapi.io/api/dartya/resource/cardata/${data.carId}`,
          {
            name: data.carName,
            details: data.carDetails,
            image: data.carImgURL,
            price: data.carPrice,
          }
        );
        this.isLoading = false;
        this.successMsg = "Car data updated successfully!";
      } catch (error) {
        this.isLoading = false;
        this.errorMsg = "Car data not updated!";
      }
    },
    // Func. to delete specific data in API
    async deleteCarData(data) {
      this.isLoading = true;
      try {
        await Axios.delete(
          `https://testapi.io/api/dartya/resource/cardata/${data.id}`
        );
        this.isLoading = false;
        this.successMsg = "Successfully Deleted!";
      } catch (error) {
        this.isLoading = false;
        this.errorMsg = "Car is not deleted!";
      }
    },
  },
  mounted() {
    this.getCarData();
  },
};
</script>
