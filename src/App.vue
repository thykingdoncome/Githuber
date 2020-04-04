<template>
  <div id="app">
   
    <!-- <Footer /> -->
        <router-view/>
         <Header />
    <Container />
  </div>
</template>

<script>
import Container from "./components/Container.vue";
import Header from "./components/Header";
// import Footer from './components/Footer';

export default {
  name: "App",
  components: {
    Container,
    Header,
    // Footer
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  background: rgb(212, 211, 211);
  padding: 1em 1em 0;
  min-height: 100vh;
}

a {
  text-decoration: none;
  color: rgb(21, 99, 99);
}
a:hover {
  text-decoration: wavy;
}

@media screen and (max-width: 780px) {
  #app {
  padding: .6em .3em 0;
  }
}
</style>
