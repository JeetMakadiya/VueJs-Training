<template>
  <div></div>
</template>

<script>
import { defineComponent, onMounted, useStore } from "@nuxtjs/composition-api";
export default defineComponent({
  name: "IndexPage",
  middleware: ["auth", "notAuth"],
  setup(_, context) {
    const store = useStore();
    onMounted(() => {
      if (context.root.$cookies.get("authToken")) {
        store.commit("auth/setIsAuthenticated", true);
      } else {
        store.commit("auth/setIsAuthenticated", false);
      }
    });
  },
});
</script>
