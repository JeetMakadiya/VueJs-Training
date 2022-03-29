<template>
  <div class="d-flex flex-wrap">
    <div class="mt-1 mb-1 ms-1 me-1">
      <b-card
        :title="cardTitle"
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-img :src="cardImage" alt="Image" bottom></b-card-img>
        <b-card-text>
          {{ cardDescription }}
        </b-card-text>
        <b-button
          href="#"
          variant="primary"
          @click="$emit('showCarPrice', price)"
          v-if="price != null"
        >
          Info
        </b-button>
        <b-button href="#" variant="primary" disabled v-else>
          available soon...
        </b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "GalleryCard",
  props: ["cardTitle", "cardImage", "cardDescription", "price"],
};
</script>
