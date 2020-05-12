<template>
  <div class="read-data">
    <router-link to="/">
      <button  id="read-btn">Go Back</button>
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
          `${this.apiUrl}/repos/${username}/${repo}/contents/${path}`
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

<style scoped>
  #read-data {
    margin-top: 2rem;
    line-height: 2rem;
    font-size: 1.2rem;
    color: rgb(21, 99, 99);
  }

  #read-btn {
    margin-top: 1rem;
    padding: .5rem 1rem;
    font-weight: 800;
    color: rgb(21, 99, 99);
    background: transparent;
    border: 1px solid rgb(21, 99, 99);
    transition: .3s;
    cursor: pointer;
  }

  #read-btn:hover {
    color:  rgb(212, 211, 211);
    background: rgb(21, 99, 99);
  }

</style>