<template>
  <section>
    <div class="m-auto mt-5 w-75">
      <AlertBox
        v-if="this.isLoading === false && this.errorMsg !== ''"
        showAlert="true"
        alertVariant="danger"
        :alertMessage="this.errorMsg"
      />
    </div>
    <div class="d-flex justify-content-center mt-5">
      <div v-if="this.isLoading === true">Loading...</div>
      <b-card
        v-if="this.errorMsg === ''"
        no-body
        class="overflow-hidden"
        style="max-width: 1040px"
      >
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              :src="this.carData.image"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="this.carData.name">
              <b-card-text>
                {{ this.carData.details }}
              </b-card-text>
              <b-card-text>
                {{ this.carData.price }}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div class="d-flex justify-content-center mt-5">
      <router-link :to="{ name: 'home' }" class="btn btn-primary">
        Back To Home Page
      </router-link>
    </div>
  </section>
</template>
<script>
import Axios from "axios";
import AlertBox from "../components/AlertBox.vue";
export default {
  name: "CarDetailsPage",
  components: { AlertBox },
  data() {
    return {
      carData: {
        image: "",
        name: "",
        details: "",
        price: "",
      },
      isLoading: false,
      errorMsg: "",
    };
  },
  methods: {
    async getCarData(id) {
      this.isLoading = true;
      await Axios.get(`https://testapi.io/api/dartya/resource/cardata/${id}`)
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          if (res && res.data) {
            this.carData = {
              image: res.data.image,
              name: res.data.name,
              details: res.data.details,
              price: res.data.price,
            };
            this.errorMsg = "";
          } else {
            this.errorMsg = "Oops, something went wrong!";
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.errorMsg = "Oops, something went wrong!";
        });
    },
  },
  created() {
    const id = this.$route.params.carId;
    this.getCarData(id);
  },
};
</script>
