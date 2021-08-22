<template>
  <div class="login">
    <loader />
  </div>
</template>

<script>
import Loader from "../components/Loader.vue"

export default {
  name: "Login",
  components: {
    loader: Loader,
  },
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000 no-repeat url("../assets/Background.png");
  background-position: 0px 40vh;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
