<template>
  <v-app>
    <v-main>
      <Gallery gallery_name="myGallery" />
    </v-main>
  </v-app>
</template>

<script>
import Gallery from "./components/Gallery.vue";

export default {
  name: "App",

  components: {
    Gallery,
  },

  data: () => ({
    //
  }),
};
</script>
