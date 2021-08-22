<template>
  <input
    type="text"
    class="input"
    :class="{ 'input--filled': value.length !== 0 }"
    placeholder="Искать..."
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  height: 45px;
  background: #000;
  border: 1px solid rgba(74, 159, 93, 0.5);
  padding: 0 15px;
  box-sizing: border-box;
  border-radius: 8px;
  color: #fff;
  font-family: "OriyaMN", sans-serif;

  &--filled {
    border: 1px solid #4a9f5d;
  }

  &:focus {
    outline: none;
    border: 1px solid rgba(74, 159, 93, 0.7);
  }
}
</style>
