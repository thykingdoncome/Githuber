<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Footer,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  outline: none;
  text-decoration: none;
}
#app {
  background: rgb(212, 211, 211);
  padding: 1em 0 0;
  min-height: 100vh;
}
.main-container {
  min-height: calc(100vh - 64px);
}
a {
  text-decoration: none;
  color: rgb(21, 99, 99);
}
a:hover {
  text-decoration: wavy;
}

.read-data {
  width: 100%;
  min-height: calc(100vh - 64px);
  padding: 0 1rem 0 3rem;
  overflow: hidden;
}

#read-data {
  margin: 0 auto;
}

@media screen and (max-width: 780px) {

}
</style>
