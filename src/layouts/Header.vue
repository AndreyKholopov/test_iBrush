<template>
  <header class="header">
    <img class="header__logo" src="../assets/Logo.svg" alt="Logo" />

    <ul class="header__list">
      <li
        class="header__list-item"
        v-for="(link, index) in linksList"
        :key="index"
      >
        {{ link.name }}
      </li>
    </ul>

    <div class="header__wrapper">
      <header-input v-model="inputData" />

      <div class="header__profile">
        <p class="header__profile-name">{{ userData.display_name }}</p>

        <img
          class="header__profile-photo"
          :src="
            userData.images && userData.images[0] && userData.images[0].url
              ? userData.images[0].url
              : '../assets/MaleUserProfile.svg'
          "
          alt="photo"
        />
      </div>
    </div>
  </header>
</template>

<script>
import Input from "../components/Input.vue"

export default {
  name: "Header",

  components: {
    "header-input": Input,
  },

  props: {
    userData: {
      type: Object,
      default: function() {
        return {}
      },
    },
  },

  data() {
    return {
      linksList: [
        {
          name: "Жанры",
          link: "#",
        },
        {
          name: "Радио",
          link: "#",
        },
        {
          name: "Моя музыка",
          link: "#",
        },
      ],
      inputData: "",
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;

  &__logo {
    width: 150px;
  }

  &__list {
    display: flex;
    padding: 0;

    &-item {
      color: #fff;
      list-style: none;
      margin-right: 25px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__wrapper {
    display: flex;
    min-width: 40%;
  }

  &__profile {
    height: 48px;
    display: flex;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
    border-radius: 8px 24px 24px 8px;
    margin-left: 15px;

    &-name {
      font-size: 16px;
      line-height: 100%;
      text-align: right;
      color: #ffffff;
      padding: 0 15px;
      margin: auto 0;
    }

    &-photo {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }
  }
}
</style>
