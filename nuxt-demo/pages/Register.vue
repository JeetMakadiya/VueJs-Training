<template>
  <section>
    <RegisterForm />
  </section>
</template>
<script>
import RegisterForm from "../components/RegisterForm.vue";

export default {
  name: "RegisterPage",
  components: { RegisterForm },
  middleware: "auth",
};
</script>
