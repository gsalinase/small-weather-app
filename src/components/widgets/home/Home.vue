<template>
  <div class="home">
    <div class="home--content">
      <div class="home--top">
        <h1 class="home--title">Forecast App</h1>
        <HomeForm />
      </div>
    </div>

    <UiWaves />
  </div>
</template>

<script>
// Components
import UiWaves from '@/components/ui/UiWaves.vue';
import HomeForm from './HomeForm.vue';

export default {
  name: 'HomeComponent',
  components: {
    HomeForm,
    UiWaves,
  },
};
</script>

<style>
.home {
  min-height: calc(100% - 85px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.home--content {
  box-sizing: border-box;
  width: 100%;
  padding: 0 2rem;
  margin-right: auto;
  margin-left: auto;
}

.home--top {
  padding-top: 1rem;
}

.home--title {
  padding-bottom: 2rem;
  font-size: var(--font-size-xxl);
  line-height: 30px;
  text-align: center;
}

.home--subtitle {
  padding-bottom: 2rem;
  font-family: var(--font-family-nunito);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
}

@media (min-width: 768px){
  .home--title {
    padding-bottom: 2rem;
    line-height: inherit;
    font-size: var(--font-size-xxxl);
  }
}

@media (min-width: 991px){
  .home--title {  
    font-size: var(--font-size-xxxxl);
  }
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
