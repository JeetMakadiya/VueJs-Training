<template>
  <div>
    <!-- <NavBar /> -->
    <GalleryCardWrapper />
    <!-- <LoginPage /> -->
    <!-- <RegisterPage /> -->
  </div>
</template>

<script>
import GalleryCardWrapper from "../components/GalleryCardWrapper.vue";
// import LoginPage from "./LoginPage.vue";
// import RegisterPage from "./RegisterPage.vue";

export default {
  name: "HomePage",
  components: {
    GalleryCardWrapper,
    // LoginPage,
    // RegisterPage,
  },
};
</script>
