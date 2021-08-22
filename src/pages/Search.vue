<template>
  <div class="search-page">
    <div class="search-page__wrapper">
      <my-header :userData="userData" />
    </div>
  </div>
</template>

<script>
import Header from "../layouts/Header.vue"

export default {
  name: "SearchPage",
  components: {
    "my-header": Header,
  },

  props: {
    access_token: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      userData: {},
    }
  },

  mounted() {
    this.getUserData()
  },

  methods: {
    async getUserData() {
      const url = "https://api.spotify.com/v1/me"

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      if (response.ok) {
        const responceData = await response.json()
        this.userData = responceData
      } else {
        this.errorAllert("Произошла ошибка, попробуйте авторизоваться снова.")
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.search-page {
  background: #000 no-repeat url("../assets/Background.png");
  background-position: 0px 70vh;
  background-size: cover;
  width: 100vw;
  height: 100vh;

  &__wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 0;
  }
}
</style>
