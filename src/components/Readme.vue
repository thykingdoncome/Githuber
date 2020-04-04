<template>
  <div class="read-data">
    <router-link to="/">
      <button>Go Back</button>
    </router-link>
    <div id="read-data" v-html="this.readMe"></div>
  </div>
</template>

<script>
import axios from "axios";
import showdown from "showdown";

export default {
  name: "Readme",
  data() {
    return {
      readMe: "",
      clientId: process.env.VUE_APP_CLIENT_ID,
      clientSecret: process.env.VUE_APP_CLIENT_SECRET,
      apiUrl: process.env.VUE_APP_BASE_URL,
    };
  },
  methods: {
    async fetchReadme(username, repo) {
      try {
        username = this.$route.params.username;
        repo = this.$route.params.repo;
        const path = "README.md";
        const response = await axios.get(
          `${this.apiUrl}/repos/${username}/${repo}/contents/${path}?client_id=${this.clientId}&client_secret=${this.clientSecret}`
        );
        const rawReadMe = atob(response.data.content);
        const convert = new showdown.Converter();
        const html = convert.makeHtml(rawReadMe);
        this.readMe = html;
      } catch (error) {
        this.$swal('Something went wrong!');
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchReadme();
  },
};
</script>

