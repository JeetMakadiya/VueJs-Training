<template>
  <!-- <div class="mt-1 mb-1 ms-1 me-1"> -->
  <b-card
    :title="cardTitle"
    tag="article"
    style="max-width: 20rem"
    class="mb-2"
  >
    <b-card-img :src="cardImage" alt="Image" height="150" bottom></b-card-img>
    <b-card-text>
      {{ cardDescription }}
    </b-card-text>
    <!-- Info Button -->
    <b-button
      href="#"
      variant="primary"
      @click="$emit('showCarPrice', price)"
      v-if="price != null"
    >
      Info
    </b-button>
    <!-- available soon Button -->
    <b-button href="#" variant="primary" disabled v-else>
      available soon...
    </b-button>
    <!-- Edit Button -->
    <b-button
      href="#"
      variant="primary"
      class="ms-3"
      v-b-modal="'modal-prevent-closing-' + cardId"
      @click="editModalOpen(this.cardId)"
    >
      Edit
    </b-button>
  </b-card>
</template>

<script>
// import CarForm from "../components/CarForm.vue";
export default {
  name: "GalleryCard",
  components: {},
  props: ["cardId", "cardTitle", "cardImage", "cardDescription", "price"],
  methods: {},
};
</script>
