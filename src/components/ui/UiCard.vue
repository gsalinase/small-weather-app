<template>
  <div
    class="ui-card"
    :class="{ 'ui-card--light': light, 'ui-card--small': size === 'small' }"
  >
    <slot>Content</slot>
  </div>
</template>

<script>
export default {
  props: {
    light: {
      type: Boolean,
      default: false
    },
    size: String, 
  },
};
</script>

<style scoped>
.ui-card {
  box-sizing: border-box;
  padding: 1.5rem 2rem;
  border: 1px solid var(--ui-card-border);
  border-radius: 10px;
  background-color: var(--ui-card-bg);
}

.ui-card--light {
  border: 1px solid var(--ui-card-border);
  background-color: var(--color-purple-8);
}

.ui-card--small {
  padding: 0.8rem 1.5rem;
}

@media (min-width: 567px){
 .ui-card {
    padding: 1.5rem 4rem;
  }

  .ui-card--small {
    padding: 0.8rem 1.5rem;
  }
}
</style>
