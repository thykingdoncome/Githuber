<template>
  <div>
    <div v-html="this.readMe"></div>
  </div>
</template>

<script>
import axios from "axios";
import showdown from "showdown";

export default {
  name: "Readme",
  data() {
    return {
      id: "",
      username: "",
      userName: "", 
      repos: "",     
      pubRepo: "",
      readMe: "",
      clientId: process.env.VUE_APP_CLIENT_ID,
      clientSecret: process.env.VUE_APP_CLIENT_SECRET,
      apiUrl: process.env.VUE_APP_BASE_URL,
    };
  },
  methods: {
    async fetchReadme(username, repo) {
      try {
         //  /:username
          username= this.$route.params.username
        username = this.userName;
        const path = "README.md";
        const response = await axios.get(
          `${this.apiUrl}/repos/${username}/${repo}/contents/${path}?client_id=${this.clientId}&client_secret=${this.clientSecret}`
        );
        const rawReadMe = atob(response.data.content);
        const convert = new showdown.Converter();
        const html = convert.makeHtml(rawReadMe);
        this.readMe = html;
      } catch (error) {
        this.$swal(error);
        console.log(error);
      }
    }
  },
  mounted() {
      this.fetchReadme()
  },
};
</script>
