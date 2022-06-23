export default {
  computed: {
    carsData() {
      return this.$store.getters["cars/getCarsData"];
    },
    selectedCarData() {
      return this.$store.getters["cars/getSelectedCarData"];
    },
    isLoading() {
      return this.$store.getters["cars/getIsLoading"];
    },
    successMsg() {
      return this.$store.getters["cars/getSuccessMsg"];
    },
    errorMsg() {
      return this.$store.getters["cars/getErrorMsg"];
    },
  },
  methods: {
    // func. to show car price in alert box
    showCarDetails(id) {
      this.$router.push({
        name: "carDetails",
        params: { carId: id },
      });
    },
    // func. to Edit Card
    editCard(data) {
      let selectedCarData = {
        carId: data.id,
        carName: data.title,
        carDetails: data.description,
        carPrice: data.price,
        carImgURL: data.image,
      };
      this.$store.commit("cars/setSelectedCarData", selectedCarData);
      this.$store.commit("ui/openDialog", { type: "edit" });
    },
    // Func. to Delete Card
    async deleteCard(data) {
      await this.$store.dispatch("cars/deleteCar", data);
      alert("Deleted : " + data.title);
      await this.$store.dispatch("cars/getCarsData");
    },
  },
};
