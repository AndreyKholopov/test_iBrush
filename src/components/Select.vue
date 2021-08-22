<template>
  <div class="select">
    <input
      class="select__input"
      multiple
      type="hidden"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />

    <div
      class="select__head"
      :class="{ 'select__head--open': open }"
      @click="open = true"
    >
      <p class="select__head-title">Искать...</p>
    </div>

    <ul v-if="open" class="select__list" v-click-outside="closeList">
      <li
        class="select__item"
        :class="{ 'select__item--active': value.includes(option) }"
        v-for="(option, index) in options"
        :key="index"
        @click="addOrRemoveContent(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      },
    },
    options: {
      type: Array,
      default: function() {
        return []
      },
    },
  },

  data: function() {
    return {
      open: false,
    }
  },

  methods: {
    addOrRemoveContent(optionValue) {
      if (this.value.includes(optionValue)) {
        this.closeList()
      } else {
        this.value.push(optionValue)
      }
    },
    closeList() {
      this.open = false
    },
  },
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  display: block;
  min-width: 220px;
  width: 100%;

  &__head {
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    background: #000;
    border: 1px solid rgba(74, 159, 93, 0.5);
    padding: 0 15px;
    box-sizing: border-box;
    border-radius: 8px;
    color: #fff;
    font-family: "OriyaMN", sans-serif;
    cursor: pointer;

    &-title {
      margin: auto 0;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.35);
      font-family: "OriyaMN", sans-serif;
    }

    &::after {
      width: 10px;
      height: 6px;
      background: transparent
        url("data:image/svg+xml,%3Csvg width='13' height='8' viewBox='0 0 13 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.843018 1.59299L6.50002 7.24999L12.157 1.59299L11.45 0.885986L6.50002 5.83599L1.55002 0.885986L0.843018 1.59299Z' fill='%234A9F5D' fill-opacity='0.5'/%3E%3C/svg%3E%0A")
        no-repeat center / cover;
      position: absolute;
      right: 20px;
      bottom: 50%;
      transform: translateY(50%);
      content: "";
      display: block;
      transition: 0.2s ease-in;
    }

    &--open::after {
      transform: translateY(50%) rotate(180deg);
    }
  }

  &__list {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 10px;
    margin-top: 5px;
    max-height: 205px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 100;
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: #424348;
    scrollbar-color: dark;
    scrollbar-width: thin;
    overscroll-behavior: contain;
  }

  &__item {
    position: relative;
    border-top: 1px solid rgba(224, 229, 231, 0.5);
    padding: 10px 15px;
    cursor: pointer;
    list-style-type: none;

    &:hover,
    &--active {
      background-color: rgba(224, 229, 231, 0.5);
    }
  }
}
</style>
