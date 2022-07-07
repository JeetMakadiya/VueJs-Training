<template>
  <div>
    <GalleryCardWrapper />
  </div>
</template>
<script>
import GalleryCardWrapper from "../components/GalleryCardWrapper.vue";
export default {
  components: { GalleryCardWrapper },
  name: "Home",
  middleware: "auth",
};
</script>
