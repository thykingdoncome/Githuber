<template>
  <div id="app">
    
    <Container />
  </div>
</template>

<script>
import Container from './components/Container.vue'

export default {
  name: 'App',
  components: {
    Container
  }
}
</script>

<style>
* {
    margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app{
background: rgb(212, 211, 211);
}
</style>
