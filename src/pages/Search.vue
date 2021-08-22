<template>
  <div class="search-page"></div>
</template>

<script>
export default {
  name: "SearchPage",

  props: {
    access_token: {
      type: String,
      default: "",
    },
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
        console.log("responceData: ", responceData)
      } else {
        this.errorAllert("Произошла ошибка, попробуйте авторизоваться снова.")
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.search-page {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000 no-repeat url("../assets/Background.png");
  background-position: 0px 70vh;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
