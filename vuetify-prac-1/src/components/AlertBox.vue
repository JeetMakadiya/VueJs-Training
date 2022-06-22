<template>
  <v-alert dismissible dense :type="this.alertVariant">
    Something Went Wrong!
  </v-alert>
</template>
<script>
export default {
  name: "AlertBox",
  props: ["alertVariant", "showAlert", "alertMessage"],
};
</script>
