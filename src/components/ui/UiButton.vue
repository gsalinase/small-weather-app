<template>
  <button
    class="ui-button"
    :class="{ 'ui-button--active': active }"
    :type="type"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    type: {
      type: String,
      default: 'button',
      validator(value) {
        return ['submit', 'button'].indexOf(value) !== -1;
      },
    },
    active: {
      type: Boolean,
      default: false,
    }
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.ui-button {
  width: 100%;
  padding: .6rem 1rem;
  border: 1px solid var(--color-purple-1);
  border-radius: 8px;
  background-color: var(--purple);
  font-family: var(--font-family-dm-sans);
  font-weight: var(--font-weight-bold);
  color: var(--white);
  cursor: pointer;
  transition: .25s;
}

.ui-button:hover,
.ui-button.ui-button--active {
  background-color: var(--green);
  color: var(--color-purple-1);
  border: 1px solid var(--color-purple-3);
}

@media (min-width: 1200px){
  .home--content {
    max-width: 1320px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
