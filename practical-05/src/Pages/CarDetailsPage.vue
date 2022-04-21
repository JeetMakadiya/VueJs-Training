<template>
  <section>
    <div class="d-flex justify-content-center mt-5">
      <b-card no-body class="overflow-hidden" style="max-width: 1040px">
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
export default {
  name: "CarDetailsPage",
  data() {
    return {
      carData: {
        image: "https://picsum.photos/400/400/?image=20",
        name: "creta",
        details:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit.onsectetur adipisicing elit.onsectetur adipisicing elit.onsectetur adipisicing elit.",
        price: "2500000",
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
          this.isLoading = false;
          if (res && res.data) {
            this.carData = {
              image: res.data.image,
              name: res.data.name,
              details: res.data.details,
              price: res.data.price,
            };
          } else {
            this.errorMsg = "Oops, something went wrong!";
          }
        })
        .catch(() => {
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
