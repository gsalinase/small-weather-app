<template>
  <div class="navigation">
    <div class="navigation--logo">
      <router-link to="/">
        <img src="../../assets/logo.svg" alt="" />
      </router-link>
    </div>
    <div class="navigation--content"></div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  setup() {
    return {};
  },
};
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.navigation--logo img {
  width: 40px;
}

.navigation--list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navigation--item {
  margin-right: 1rem;
}

.navigation--item a {
  color: var(--color-gray-4);
  text-decoration: none;
}

.navigation--item a:hover {
  color: var(--color-gray-3);
  text-decoration: none;
}

@media (min-width: 991px){
  .navigation--logo img {
    width: 50px;
  }
}
</style>
