<template>
  <div class="gallery">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>{{ gallery_name }}</h3>
    <div class="category-nav">
      <label> <input type="radio" v-model="category" value="" /> All </label>
      <label>
        <input type="radio" v-model="category" value="Package" /> Package
      </label>
      <label>
        <input type="radio" v-model="category" value="Symbol" /> Symbol
      </label>
    </div>
    <!-- <p>{{ images }}</p> -->
    <ul class="category-list">
      <!-- <li> <img :src="images[0].src"> </li> -->
      <li v-for="image in filterByCategory" :key="image.index">
        <img :src="image.src" :alt="image.index" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Gallery",
  props: {
    msg: String,
    gallery_name: String,
  },
  data() {
    return {
      category: "",
      images: [],
    };
  },
  mounted: function () {
    axios
      .get("/image_list.json")
      .then((response) => (this.images = response.data.images));
  },
  computed: {
    filterByCategory: function () {
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
