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
    <div class="position-absolute bottom-0 mb-1">
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
        available <br />soon
      </b-button>
      <!-- Edit Button -->
      <b-button
        href="#"
        variant="primary"
        class="ms-3"
        v-b-modal="'modal-prevent-closing-' + cardId"
        @click="$emit('editCard')"
      >
        Edit
      </b-button>
      <!-- Delete Button -->
      <b-button
        href="#"
        variant="primary"
        class="ms-3"
        v-b-modal="'modal-prevent-closing-' + cardId"
        @click="$emit('deleteCard')"
      >
        Delete
      </b-button>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "GalleryCard",
  components: {},
  props: ["cardId", "cardTitle", "cardImage", "cardDescription", "price"],
};
</script>
