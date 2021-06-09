<template>
  <div class="main">
    <!-- Navigation -->
    <Navigation />

    <!-- Pagination -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Footer -->
  </div>
</template>

<script>
// API
import api from '@/api/index.js';

// Components
import Navigation from '@/components/layout/Navigation.vue';

// Composition API
import { reactive } from 'vue'


export default {
  name: 'App',
  components: {
    Navigation,
  },
};
</script>

<style>
#app,
.main {
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
