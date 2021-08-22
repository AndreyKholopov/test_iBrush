<template>
  <div class="login">
    <div class="login__wrapper">
      <img class="login__logo" src="../assets/Logo.svg" alt="Logo" />

      <login-button textButton="Войти" @clickOnButton="login" />
    </div>
  </div>
</template>

<script>
import MyButton from "../components/Button.vue"

export default {
  name: "Login",
  components: {
    "login-button": MyButton,
  },

  methods: {
    login() {
      console.log("login")
    },
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

  &__wrapper {
    display: flex;
    flex-direction: column;
  }

  &__logo {
    margin-bottom: 40px;
  }
}
</style>
