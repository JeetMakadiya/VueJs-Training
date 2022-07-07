<template>
  <v-alert dismissible dense :type="this.alertVariant">
    {{ this.alertMessage }}
  </v-alert>
</template>
<script>
export default {
  name: "AlertBox",
  props: ["alertVariant", "alertMessage"],
};
</script>
