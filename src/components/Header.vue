<template>
  <div class="app-header">
    <div>
      <span class="logo">
        <h1>GITHUBER<i class="fab fa-github"></i></h1>
      </span>
    </div>

    <div class="contact-wrapper">
      <span class="contact">
        <i class="far fa-envelope"></i>
        <a href="mailto:davidisrael194@gmail.com" target="_top">
          davidisrael194@gmail.com</a
        >
      </span>

      <span class="contact">
        <i class="fas fa-phone-volume"></i>
        <a href="tel:+2349064688408">+2349064688408</a>
      </span>

      <!-- <span>
        <button class="toggle" @click="toggle">Theme</button>
      </span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toggle() {
      const element = document.getElementById("app");
      console.log(element)
      element.classList.toggle("dark-mode");     
    },
  },
};
</script>

<style scoped>
.app-header {
  color: rgb(21, 99, 99);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 1em;
  width: 80%;
  margin: 0 auto;
}
.dark-mode {
  background: black;
  color: white;
}

.logo {
  font-size: 1em;
  letter-spacing: 7px;
  font-weight: bold;
}

.contact-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.contact-wrapper span:nth-of-type(1) {
  padding-right: 2em;
}

/* .contact-wrapper span:nth-of-type(2) {
  padding-right: 2em;
} */

.toggle {
  border-radius: 50%;
  padding: 1em;
  border: none;
  background: rgb(21, 99, 99);
  color: white;
  font-weight: 700;
  outline: none;
}

.contact {
  font-size: 0.9em;
}

.contact a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 780px) {
  .logo {
    font-size: 0.6em;
    letter-spacing: 4px;
    text-align: center;
  }
  .app-header {
    letter-spacing: 3px;
    font-size: 1.5em;
    width: 100%;
    text-align: center;
    display: block;
  }

  .contact-wrapper {
    display: none;
  }
}
</style>
