<template>
  <v-app>
    <v-main>
      <HelloWorld />
      <Gallery />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Gallery from "./components/Gallery.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
    Gallery,
  },

  data: () => ({
    //
  }),
};
</script>
