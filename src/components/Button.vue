<template>
  <button class="button" @click="clickOnButton">{{ textButton }}</button>
</template>

<script>
export default {
  name: "my-button",

  props: {
    textButton: {
      type: String,
      default: "",
    },
  },

  methods: {
    clickOnButton() {
      this.$emit("clickOnButton")
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  background: #4a9f5d;
  color: #fff;
  font-family: "OriyaMN", sans-serif;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 14px 15px;

  &:hover {
    background: #6bc27e;
  }

  &:active {
    background: #2d803f;
  }
}
</style>
