<template>
  <div id="app">
    <login-page />
  </div>
</template>

<script>
import LoginPage from "./pages/Login.vue"

export default {
  name: "App",
  components: {
    "login-page": LoginPage,
  },
}
</script>

<style>
#app {
}
</style>
