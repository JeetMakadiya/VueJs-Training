<template>
  <v-card class="gallery_card">
    <v-card-title>{{ cardTitle }}</v-card-title>
    <v-avatar class="ma-3" size="250" tile>
      <v-img :src="cardImage"></v-img>
    </v-avatar>
    <v-card-text class="mb-3">
      {{ cardDescription }}
    </v-card-text>
    <v-card-actions class="card_actions">
      <v-row no-gutters>
        <v-col cols="12">
          <v-btn
            color="primary"
            class="mb-2"
            @click="$emit('showCarDetails', cardId)"
            v-if="price !== null"
            block
            small
          >
            Info
          </v-btn>
          <!-- available soon Button -->
          <v-btn color="primary" disabled v-else block small>
            available soon...
          </v-btn>
        </v-col>
        <v-col cols="6" class="pr-1">
          <!-- Edit Button -->
          <v-btn color="primary" @click="$emit('editCard')" block small>
            Edit
          </v-btn>
        </v-col>
        <v-col cols="6" class="pl-1">
          <!-- Delete Button -->
          <v-btn color="primary" @click="$emit('deleteCard')" block small>
            Delete
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "GalleryCard",
  props: ["cardId", "cardTitle", "cardImage", "cardDescription", "price"],
};
</script>
<style>
.gallery_card {
  padding-bottom: 50px;
}
.card_actions {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
