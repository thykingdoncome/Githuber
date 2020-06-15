<template>
  <div class="main-container">
    <Header />
    <div class="main-wrapper">
      <form @submit.prevent="fetchData" autocomplete="on">
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

      <div class="user-info" v-if="this.userName">
        <div class="image-div"><img :src="imgSrc" /></div>
        <div>
          <h2>{{ githuberName }}</h2>
          <h3 v-if="userName">
            <em>@{{ userName }}</em>
          </h3>
          <p><span>Location:</span> {{ locate }}</p>
          <p><span>Followers:</span> {{ followers }}</p>
          <p><span>Following:</span> {{ following }}</p>
          <p><span>Member Since:</span> {{ joined }}</p>
        </div>
      </div>

      <div class="repos-sec" v-if="this.userName">
        <h2 class="repo-header" v-if="this.repos.length !== 0">REPOSITORIES</h2>
        <h3 class="repo-header" v-if="this.repos.length == 0">
          This User has no Public repository or 0 repositories
        </h3>
        <ul>
          <li v-for="item in repos" :key="item.id">
            <h2>{{ item["name"] }}</h2>
            <p>{{ item.description }}</p>
            <div class="italic">
              <span v-if="item.language != null"
                >Language: <em>{{ item.language }}</em></span
              >
              <em><i class="fas fa-code-branch"></i> {{ item.forks }}</em>
              <em>
                <i class="fas fa-star"></i>
                {{ item.stargazers_count }}
              </em>
            </div>
            <div class="italic">
              <!-- <router-link :to="{name: 'Readme', params: {username: userName, repo: item.name}}"> -->
              <router-link :to="`/readme/${userName}/${item.name}`" target="_blank">
                <button>
                  View Readme
                </button>
              </router-link>

              <a v-if="item.homepage" :href="item.homepage" target="_blank"
                ><button>Live Preview</button></a
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header";
import dotEnv from 'dotenv'

dotEnv.config()

  const {
    VUE_APP_BASE_URL,
     VUE_APP_CLIENT_ID,
     VUE_APP_CLIENT_SECRET
     } = process.env

export default {
  name: "Container",
  components: {
    Header,
  },
  data() {
    return {
      githubUser: {},
      repooo: [],
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
      // githubUser: {},
      // clientId: VUE_APP_CLIENT_ID,
      // clientSecret: VUE_APP_CLIENT_SECRET,
      // apiUrl: VUE_APP_BASE_URL,
    };
  },
  methods: {
    async fetchData(username) {
      try {
        username = this.username;
        const res = await axios.get(
          `${VUE_APP_BASE_URL}/users/${username}?client_id=${VUE_APP_CLIENT_ID}&client_secret=${VUE_APP_CLIENT_SECRET}`
        );

        const resRep = await axios.get(
          `${VUE_APP_BASE_URL}/users/${username}/repos?per_page=100&client_id=${VUE_APP_CLIENT_ID}&client_secret=${VUE_APP_CLIENT_SECRET}`
        );

        this.githubUser = res.data;
        this.repooo = resRep.data;

        // const userr = this.githubUser;
        // const rep = this.repooo;

        // console.log("badguys", userr, rep);

        this.id = res.data.id;
        this.imgSrc = res.data.avatar_url;
        this.pubRepo = res.data.public_repos;
        this.followers = res.data.followers;
        this.following = res.data.following;
        const formatTime = new Date(res.data.created_at);
        this.joined = formatTime.toLocaleString();
        this.locate = res.data.location;
        this.githuberName = res.data.name;
        const displayName = this.username;
        this.userName = displayName;
        // console.log("jsjsjsj", this.githubUser);

        // console.log("repos", resRep.data);
        this.repos = resRep.data;
        this.username = "";
      } catch (error) {
        this.$swal("User does not exist", "info");
      }
    },
  },
  mounted() {
    this.fetchData(this.username="thykingdoncome");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrapper {
  width: 80%;
  margin: 0 auto;
}
.inputs {
  padding: 2em 0;
  display: flex;
  width: auto;
  justify-content: space-between;
  color: rgb(212, 211, 211);
}
input[type="text"] {
  border: 1px solid rgb(0, 0, 0);
  outline: none;
  color: rgb(212, 211, 211);
  background: rgb(21, 99, 99);
  padding: 0.6em 1em;
  border-radius: 4px;
  width: 45%;
  font-size: 18px;
  font-weight: 500;
}
input[type="text"]::placeholder {
  color: rgb(212, 211, 211);
}
input[type="submit"] {
  outline: none;
  border-radius: 4px;
  color: rgb(212, 211, 211);
  cursor: pointer;
  border: none;
  padding: 0.6em 1.5em;
  font-weight: 700;
  background: rgb(21, 99, 99);
  transition: 0.3s;
}
input[type="submit"]:hover {
  background: rgb(8, 65, 65);
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  color: rgb(21, 99, 99);
  margin: 0 auto;
}

.image-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 250px;
  background: #dde1e7;
  border-radius: 50%;
  box-shadow: -3px -3px 7px #ffffffa6, 3px 3px 5px rgba(94, 104, 121, 0.712);
  position: relative;
  margin: 1em 0;
}
.image-div:after {
  content: "";
  position: absolute;
  height: 90%;
  width: 90%;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: inset -3px -3px 7px #ffffffb0,
    inset 3px 3px 5px rgba(94, 104, 121, 0.671);
}
img {
  height: 216px;
  width: 216px;
  border-radius: 50%;
}

.user-info div:nth-of-type(2) {
  line-height: 30px;
}
.user-info p span {
  font-weight: 800;
}

.repos-sec {
  padding-top: 1.5em;
}

.repo-header {
  text-align: center;
  padding: 0.3em 0 1em;
  color: rgb(21, 99, 99);
}
ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

li {
  padding: 0.5em 1em;
  margin: 1em 0 0.5em;
  background: rgb(21, 99, 99);
  list-style: none;
  width: 45%;
  color: rgb(212, 211, 211);
  border-radius: 4px;
  height: fit-content;
}

.italic {
  display: flex;
  justify-content: space-between;
  padding-top: 0.7em;
}

li button {
  border: 1px solid black;
  padding: 0.6em;
  outline: none;
  color: rgb(21, 99, 99);
  border-radius: 3px;
  cursor: pointer;
  font-weight: 700;
  transition: 0.3s;
}

li button:hover {
  background: rgb(52, 54, 54);
  color: rgb(212, 211, 211);
}

@media screen and (max-width: 780px) {
  .main-wrapper {
    width: 100%;
    padding: 0 0.5em;
  }
  .inputs {
    padding: 0;

    margin-bottom: 1em;
  }
  input[type="text"] {
    padding: 0.6em;
    width: auto;
  }

  .user-info {
    display: block;
  }
  .image-div {
    height: 150px;
    width: 150px;
    margin: 0 auto;
  }
  img {
    height: 130px;
    width: 130px;
  }
  .user-info div:nth-of-type(2) {
    line-height: 20px;
    margin: 1em auto 0;
    width: fit-content;
  }
  .repos-sec {
    padding-top: 1em;
  }
  .repo-header {
    padding: 0.3em 0 0.5em;
  }
  ul {
    display: block;
  }
  li {
    width: 100%;
  }
}
</style>
