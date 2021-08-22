<template>
  <div id="app">
    <loading-page v-if="loading" />
    <login-page v-if="!loading && access_token.length === 0" />
    <search-page
      v-if="!loading && access_token.length !== 0"
      :access_token="access_token"
    />
  </div>
</template>

<script>
import LoginPage from "./pages/Login.vue"
import SearchPage from "./pages/Search.vue"
import LoadingPage from "./pages/Loading.vue"

export default {
  name: "App",
  components: {
    "login-page": LoginPage,
    "search-page": SearchPage,
    "loading-page": LoadingPage,
  },

  data() {
    return {
      access_token: "",
      loading: true,
    }
  },

  async mounted() {
    if (window.location.href.includes("error")) {
      this.errorAllert("Произошла ошибка, попробуйте авторизоваться снова.")
    } else if (localStorage.getItem("SpotifyVueTest")) {
      const refresh_token = JSON.parse(localStorage.getItem("SpotifyVueTest"))
        .refresh_token
      const url = "https://accounts.spotify.com/api/token"
      const encodeData = this.encodeClientIdAndSecret()

      const data = new URLSearchParams()
      data.append("grant_type", "refresh_token")
      data.append("refresh_token", refresh_token)

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodeData}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      })

      if (response.ok) {
        const responceData = await response.json()
        this.access_token = responceData.access_token
        this.saveInLocalStorage(responceData.access_token, refresh_token)
      } else {
        this.errorAllert("Произошла ошибка, попробуйте авторизоваться снова.")
      }
    } else if (window.location.href.includes("code")) {
      const code = window.location.href.split("?code=")[1]
      const url = "https://accounts.spotify.com/api/token"
      const encodeData = this.encodeClientIdAndSecret()

      const data = new URLSearchParams()
      data.append("grant_type", "authorization_code")
      data.append("redirect_uri", this.$globalData.redirect_uri)
      data.append("code", code)

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodeData}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      })

      if (response.ok) {
        const responceData = await response.json()
        this.access_token = responceData.access_token
        this.saveInLocalStorage(
          responceData.access_token,
          responceData.refresh_token
        )
      } else {
        this.errorAllert("Произошла ошибка, попробуйте авторизоваться снова.")
      }
    }
    this.loading = false
  },

  methods: {
    saveInLocalStorage(access_token, refresh_token) {
      const data = {
        access_token,
        refresh_token,
      }
      localStorage.setItem("SpotifyVueTest", JSON.stringify(data))
    },

    errorAllert(text) {
      alert(text)
    },

    encodeClientIdAndSecret() {
      return window.btoa(
        `${this.$globalData.client_id}:${this.$globalData.client_secret}`
      )
    },
  },
}
</script>

<style>
#app {
  min-width: 100vw;
  min-height: 100vh;
  font-family: "OriyaMN", sans-serif;
}
</style>
