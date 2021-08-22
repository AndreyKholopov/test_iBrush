<template>
  <div class="search-page">
    <div class="search-page__wrapper">
      <my-header :userData="userData" />

      <article class="search-page__main-article">
        <h1 class="search-page__title">Поиск</h1>

        <div class="search-page__search">
          <label class="search-page__label" for="searchInput">
            Найдите трек или исполнителя, которого вы хотите взять за основу
            рекомендации
          </label>

          <my-input v-model="searchData" id="searchInput" />
        </div>

        <my-about-music
          :image="findingTrack.image"
          :title="findingTrack.title"
          :author="findingTrack.author"
        />

        <div class="search-page__search">
          <label class="search-page__label">
            Добавьте жанр для поиска, если нужно
          </label>

          <my-select v-model="genres" :options="genresLists" />
        </div>

        <div class="search-page__genres-tags">
          <div class="search-page__tag" v-for="genre in genres" :key="genre">
            <p class="search-page__tag-title">
              {{ genre }}
            </p>

            <button class="search-page__tag-button" @click="removeGenre(genre)">
              &#10006;
            </button>
          </div>
        </div>
      </article>

      <div class="search-page__button-wrapper">
        <my-button
          class="search-page__button"
          textButton="Искать"
          @clickOnButton="findTrackOnRecommendations"
        />
      </div>

      <h2
        class="search-page__subtitle"
        v-if="findingRecomendationTracks.length > 0"
      >
        Вот, что мы нашли:
      </h2>
      <p
        class="search-page__label"
        v-if="findingRecomendationTracks.length > 0"
      >
        Кликните по обложке, чтобы добавить трек в плейлист у себя в аккаунте
      </p>

      <div class="search-page__recomendations">
        <my-about-music
          v-for="recomendationTrack in findingRecomendationTracks"
          :key="recomendationTrack.name"
          :image="recomendationTrack.album.images[0].url"
          :title="recomendationTrack.name"
          :author="recomendationTrack.artists[0].name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../layouts/Header.vue"
import Input from "../components/Input.vue"
import Select from "../components/Select.vue"
import About from "../components/AboutMusic.vue"
import Button from "../components/Button.vue"

export default {
  name: "SearchPage",
  components: {
    "my-header": Header,
    "my-input": Input,
    "my-select": Select,
    "my-about-music": About,
    "my-button": Button,
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
      genres: [],
      genresLists: [],
      searchData: "",
      findingTrack: {
        image: "",
        title: "",
        author: "",
      },
      findingRecomendationTracks: [],
    }
  },

  mounted() {
    this.getUserData()
    this.getGenres()
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

    async getGenres() {
      const url =
        "https://api.spotify.com/v1/recommendations/available-genre-seeds"

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      if (response.ok) {
        const responceData = await response.json()
        this.genresLists = responceData.genres
      } else {
        this.errorAllert("Произошла ошибка, попробуйте авторизоваться снова.")
      }
    },

    async getTrackData(searchValue) {
      let url = "https://api.spotify.com/v1/search"
      url += `?q=${encodeURI(searchValue)}`
      url += "&type=track"
      url += "&limit=1"

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      if (response.ok) {
        const responceData = await response.json()
        this.findingTrack.image =
          responceData.tracks.items[0].album.images[0].url
        this.findingTrack.title = responceData.tracks.items[0].name
        this.findingTrack.author = responceData.tracks.items[0].artists[0].name
      } else {
        this.errorAllert("Произошла ошибка, попробуйте авторизоваться снова.")
      }
    },

    async findTrackOnRecommendations() {
      let searchParams = `artist:${this.findingTrack.author}`
      if (this.genres.length > 0) {
        this.genres.forEach((el, index) => {
          if (index === 0) {
            searchParams += `%20genre:%22${el}`
          } else {
            searchParams += `%20${el}`
          }
        })
        searchParams += "%22"
      }

      let url = "https://api.spotify.com/v1/search"
      url += `?q=${searchParams}`
      url += "&type=track"
      url += "&limit=3"

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      if (response.ok) {
        const responceData = await response.json()
        this.findingRecomendationTracks = responceData.tracks.items
      } else {
        this.errorAllert("Произошла ошибка, попробуйте авторизоваться снова.")
      }
    },

    removeGenre(genre) {
      const index = this.genres.indexOf(genre)
      if (index > -1) {
        this.genres.splice(index, 1)
      }
    },
  },

  watch: {
    searchData: function(val) {
      if (val.length === 0) {
        this.findingTrack.image = ""
        this.findingTrack.title = ""
        this.findingTrack.author = ""
      } else this.getTrackData(val)
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
  min-height: 100vh;
  height: 100%;

  &__wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 0;
  }

  &__main-article {
    margin-top: 80px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  &__title {
    color: #fff;
    font-weight: 500;
    font-size: 48px;
    margin: 0;
    grid-row-start: 1;
    grid-column-start: 1;
    grid-row-end: 2;
    grid-column-end: 3;
  }

  &__subtitle {
    color: #fff;
    font-weight: 500;
    font-size: 36px;
    margin: 0;
  }

  &__search {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__label {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 15px;
    color: #ffffff;
  }

  &__genres-tags {
    display: flex;
    margin-top: 34px;
  }

  &__tag {
    height: 45px;
    background: #4a9f5d;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    margin-right: 8px;

    &-title {
      color: #fff;
      margin: 0;
    }

    &-button {
      margin-left: 20px;
      border: none;
      border-radius: 50%;
      background: transparent;
      cursor: pointer;
      color: #fff;
    }
  }

  &__button {
    width: 200px;

    &-wrapper {
      margin-top: 25px;
      margin-bottom: 80px;
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }

  &__recomendations {
    margin-top: 80px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}
</style>
