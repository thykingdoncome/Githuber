<template>
  <div class="main-wrapper">
    <div>
      <form @submit.prevent="fetchData">
        <div class="inputs">
          <input
            type="text"
            v-model="username"
            placeholder="Search Username....."
            autofocus
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>

    <div>
      <img :src="imgSrc" />
      <h2>
        {{ userName }}
      </h2>
      <h2>
        {{ githuberName }}
      </h2>

      <p>{{ followers }}</p>
      <p>{{ following }}</p>

      <p>
        {{ locate }}
      </p>
      <p>
        {{ joined }}
      </p>
    </div>

    <div>
      <ul>
        <li v-for="item in repos" :key="item.id">
          {{ item["name"] }}

          <em><i class="fas fa-code-branch"></i> {{ item.forks }}</em>
          <em>
            <i class="fas fa-star"></i>
            {{ item.stargazers_count }}
          </em>
          <em>{{ item.language }}</em>
          <p>{{ item.description }}</p>
          <a v-if="item.homepage" :href="item.homepage" target="_blank"
            ><button>Live Preview</button></a
          >
          <button @click="fetchReadme(username, item.name)">view readme</button>
        </li>
      </ul>
    </div>

    <div v-html="this.readMe"></div>
  </div>
</template>

<script>
import axios from "axios";
import showdown from "showdown";

export default {
  name: "Container",
  data() {
    return {
      id: "",
      username: "",
      userName: "",
      imgSrc: "",
      repos: "",
      followers: "",
      following: "",
      pubRepo: "",
      joined: "",
      locate: "",
      githuberName: "",
      readMe: "",
      clientId: process.env.VUE_APP_CLIENT_ID,
      clientSecret: process.env.VUE_APP_CLIENT_SECRET,
      apiUrl: process.env.VUE_APP_BASE_URL
    };
  },
  methods: {
    async fetchData(username) {
      try {
        username = this.username;
        const res = await axios.get(
          `${this.apiUrl}/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`
        );
        this.id = res.data.id;
        this.imgSrc = res.data.avatar_url;
        this.pubRepo = res.data.public_repos;
        this.followers = res.data.followers;
        this.following = res.data.following;
        this.joined = res.data.created_at;
        this.locate = res.data.location;
        this.githuberName = res.data.name;
        const displayName = this.username;
        this.userName = displayName;

        const resRep = await axios.get(
          `${this.apiUrl}/users/${username}/repos?client_id=${this.clientId}&client_secret=${this.clientSecret}`
        );
        this.repos = resRep.data;

           this.username = '';
      } catch (error) {
        console.log(error);
      }
    },

    async fetchReadme(username, repo) {
      username = this.userName;
      const path = "README.md";
      const response = await axios.get(
        `${this.apiUrl}/repos/${username}/${repo}/contents/${path}?client_id=${this.clientId}&client_secret=${this.clientSecret}`
      );
      const rawReadMe = atob(response.data.content);
      const convert = new showdown.Converter();
      const html = convert.makeHtml(rawReadMe);
      this.readMe = html;
    }
  },
  mounted() {
    this.fetchData((this.username = "thykingdoncome"));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrapper {
  width: 80%;
  margin: 0 auto;
}

ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

li {
  padding: 0.5em 1em;
  margin: 1em 0;
  background: yellow;
  list-style: none;
  width: 45%;
}
</style>
