<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="this.users"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>
<script>
export default {
  name: "UserListPage",
  data() {
    return {
      headers: [
        {
          text: "Username",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { text: "Age", value: "age" },
        { text: "Date Of Birth", value: "dob" },
        { text: "Gender", value: "gender" },
        { text: "Id", value: "id" },
      ],
    };
  },
  computed: {
    users() {
      return this.$store.getters["auth/getUsers"];
    },
  },
  mounted() {
    this.$store.dispatch("auth/fetchUsers");
  },
};
</script>
