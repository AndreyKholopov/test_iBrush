<template>
  <div class="about-music">
    <img
      class="about-music__photo"
      :src="image ? image : '../assets/Rectangle.png'"
      alt="photo"
    />

    <div class="about-music__about">
      <h4 class="about-music__title">
        {{ title }}
      </h4>
      <p class="about-music__author">
        {{ author }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="scss" scoped>
.about-music {
  display: flex;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  border-radius: 8px;

  &__photo {
    width: 150px;
    height: 150px;
    border-radius: 8px;
  }

  &__about {
    margin: auto 30px;
  }

  &__title {
    margin: 0;
    margin-bottom: 8px;
    font-weight: normal;
    font-size: 28px;
    line-height: 100%;
    color: #ffffff;
  }

  &__author {
    margin: 0;
    font-weight: normal;
    font-size: 20px;
    line-height: 100%;
    color: #c3c3c3;
  }
}
</style>
