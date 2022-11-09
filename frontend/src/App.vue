<template>
  <v-app>
    <login v-if="!isLogin"></login>
    <home v-else />
  </v-app>
</template>

<script lang="ts">
  import Login from "@/views/Login.vue";
  import Home from "@/views/Home.vue";
  import { mapState } from "vuex";

  export default {
    name: "App",
    components: {
      Login,
      Home,
    },
    computed: {
      ...mapState(["isLogin"]),
    },
  };
</script>
