<template>
  <!-- <div class="mt-1 mb-1 ms-1 me-1"> -->
  <b-card
    :title="cardTitle"
    tag="article"
    style="max-width: 20rem"
    class="mb-2 position-relative"
  >
    <b-card-img :src="cardImage" alt="Image" height="150" bottom></b-card-img>
    <b-card-text class="mb-5">
      {{ cardDescription }}
    </b-card-text>
    <b-button
      href="#"
      variant="primary"
      @click="$emit('showCarPrice', price)"
      v-if="price != null"
      class="position-absolute bottom-0 mb-3"
    >
      Info
    </b-button>
    <b-button
      href="#"
      variant="primary"
      class="position-absolute bottom-0 mb-3"
      disabled
      v-else
    >
      available soon...
    </b-button>
  </b-card>
  <!-- </div> -->
</template>

<script>
export default {
  name: "GalleryCard",
  props: ["cardTitle", "cardImage", "cardDescription", "price"],
};
</script>
