<template>
  <div class="gallery">
    <!-- <p>{{ images }}</p> -->
    <!-- <ul class="category-list">

      <li v-for="image in filterByCategory" :key="image.index">
        <img :src="image.src" :alt="image.index" />
      </li>
    </ul> -->
    <v-container class="grey lighten-5">
      <h2>{{ gallery_name }}</h2>

      <div class="category-nav">
        <v-radio-group v-model="category">
          <v-row no-gutters :justify="`start`" id="category-nav">
            <v-col md="3"><v-radio :label="`All`" value="All"></v-radio></v-col>
            <v-col md="3" v-for="cat in categories" :key="cat.index"
              ><v-radio :label="`${cat}`" :value="cat"></v-radio
            ></v-col>
          </v-row>
        </v-radio-group>
      </div>
      <v-row no-gutters>
        <v-col
          v-for="image in filterByCategory"
          :key="image.index"
          cols="12"
          sm="4"
        >
          <v-card class="pa-2" outlined tile>
            <v-img :src="image.src" />
            <v-card-text>
              <h2 class="text-h6 primary--text">{{ image.name }}</h2>
              {{ image.category }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

function uniq(array) {
  const uniquedArray = [];
  for (const elem of array) {
    if (uniquedArray.indexOf(elem) < 0) uniquedArray.push(elem);
  }
  return uniquedArray;
}

export default {
  name: "Gallery",
  props: {
    gallery_name: String,
  },
  data() {
    return {
      category: "",
      categories: [],
      images: [],
    };
  },
  methods: {
    setImages: function (res) {
      this.images = res.data.images;
      console.log(`#images: ${this.images.length}`);
      for (let index = 0; index < this.images.length; index++) {
        const image = this.images[index];
        this.categories.push(image.category);
      }
      this.categories = uniq(this.categories);
    },
  },
  mounted: function () {
    axios
      .get("/imgs/image_list.json")
      .then((response) => this.setImages(response));
  },
  computed: {
    filterByCategory: function () {
      if (this.category === "All") {
        return this.images;
      }
      return this.images.filter(
        (image) => !image.category.indexOf(this.category)
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
