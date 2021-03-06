<template>
  <div>
    <div class="home--card-buttons">
      <UiButton
        v-for="button in data.buttons"
        :key="button.id"
        class="home--card--button"
        :text="button.city"
        :active="button.city === data.selectedCountry"
        @click="getSelectedCity(button.city)"
      />
    </div>
  </div>
  <UiCard
    class="home--card"
    :class="{
      'home--card-collapsed': data.collapsed,
      'home--card-loader-small': data.isLoading,
      'home--card-loader-full': !data.isLoading,
    }"
  >
    <!-- Loader -->
    <transition name="fade" mode="out-in">
      <div v-if="data.isLoading" class="home--card-loader"><UiLoader /></div>
      <!-- Normal flow -->
      <div v-else>
        <!-- Hours -->
        <transition name="fade">
          <div v-if="!data.isLoading">
            <div class="home--card-actions">
              <div class="home--card-actions-title">
                <h2>
                  {{ forecastHourly.city_name }},
                  {{ forecastHourly.country_code }}
                </h2>
                <small
                  >Last Updated:
                  {{
                    new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour12: true,
                      hour: "numeric",
                      minute: "numeric",
                      seconds: "numeric",
                    })
                  }}</small
                >
              </div>
              <h4>
                Next
                {{ forecastHourly.data.length }}
                {{ forecastHourly.data.length > 1 ? "hours" : "hour" }}
              </h4>
            </div>

            <div class="home--card-result home--card-opacity-1">
              <div
                class="home--card-result-container"
                v-for="(item, key) in forecastHourly.data"
                :key="item.id"
              >
                <UiCard light size="small">
                  <div class="home--card-result-data">
                    <div class="home--card-result-data-left">
                      <img
                        width="60"
                        :src="`https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`"
                        alt=""
                      />
                      <small>
                        <strong>{{ addingHours(key) }}</strong>
                      </small>
                    </div>
                    <div class="home--card-result-values">
                      <h5 title="">{{ item.temp }}°</h5>
                      <small>{{ item.weather.description }}</small>
                      <p></p>
                      <p></p>
                    </div>
                  </div>
                </UiCard>
              </div>
              <div
                class="home--card-see-more"
                @click="data.collapsed = !data.collapsed"
              >
                <div class="home--card-see-more-click">
                  <img src="../../../assets/arrow.svg" alt="arrow see more" />
                  <small> See {{ data.collapsed ? "Less" : "More" }} </small>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Days -->
        <div>
          <div class="home--card-actions">
            <div class="home--card-actions-title">
              <h2>
                {{ forecastDaily.city_name }}, {{ forecastDaily.country_code }}
              </h2>
              <small
                >Last Updated:
                {{
                  new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour12: true,
                    hour: "numeric",
                    minute: "numeric",
                    seconds: "numeric",
                  })
                }}</small
              >
            </div>
            <h4>
              Next
              {{ forecastDaily.data.length }}
              {{ forecastDaily.data.length > 1 ? "hours" : "hour" }}
            </h4>
          </div>

          <div class="home--card-result home--card-opacity-1">
            <div
              class="home--card-result-container"
              v-for="(item, key) in forecastDaily.data"
              :key="item.id"
            >
              <UiCard light size="small">
                <div class="home--card-result-data">
                  <div class="home--card-result-data-left">
                    <img
                      width="60"
                      :src="`https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`"
                      alt=""
                    />
                    <small>
                      <strong>{{ addingDays(key) }}</strong>
                    </small>
                  </div>
                  <div class="home--card-result-values">
                    <h5>
                      {{ item.app_max_temp }}°
                      <span class="home--card-result-values-min">
                        / {{ item.app_min_temp }}°
                      </span>
                    </h5>
                    <small>{{ item.weather.description }}</small>
                  </div>
                </div>
              </UiCard>
            </div>
            <div
              class="home--card-see-more"
              @click="data.collapsed = !data.collapsed"
            >
              <div class="home--card-see-more-click">
                <img src="../../../assets/arrow.svg" alt="arrow see more" />
                <small> See {{ data.collapsed ? "Less" : "More" }} </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </UiCard>
</template>

<script>
// API
import api from '@/api/index';

// Components
import UiButton from '@/components/ui/UiButton.vue';
import UiCard from '@/components/ui/UiCard.vue';
import UiLoader from '@/components/ui/UiLoader.vue';
import UiInput from '@/components/ui/UiInput.vue';

// Composition API
import { useStore } from 'vuex'
import { reactive, computed } from 'vue'

// Utils
import utils from '@/utils/utils';

export default {
  name: 'HomeForm',
  components: {
    UiButton,
    UiCard,
    UiLoader,
    UiInput,
  },
  setup() {
    const store = useStore()
    const form = reactive({
      amount: '',
    });
    const data = reactive({ 
      collapsed: false,
      isLoading: false,
      selectedCountry: 'Rio de Janeiro,BR',
      buttons: [{
          title: 'Rio de Janeiro',
          city: 'Rio de Janeiro,BR', 
        },
        {
          title: 'Beijing',
          city: 'Beijing,CN', 
        },
        {
          title: 'Los Angeles',
          city: 'Los Angeles,CA', 
      }],
    })
    function getSelectedCity(city) {
      data.selectedCountry = city
      getForecastData(city)
    }
    function addingHours(i) {
      Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
      }
      const date = new Date().addHours(i).toLocaleTimeString("en-US", {
        hour: "numeric",
      })
      return date
    }
    function addingDays(i) {
      Date.prototype.addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      }
      const date = new Date().addDays(i).toLocaleDateString("en-US")
      return date
    }
    function getForecastData(cityTarget) {
      data.isLoading = true;
      const apiUrl = 'https://api.weatherbit.io/v2.0/forecast'
      const accessKey = '82e6fe4b35c44f23a09bb64bc8be7389'
      const city = cityTarget
      api.forecastData(`${apiUrl}/hourly?city=${city}&key=${accessKey}&hours=6`).then((response) => {
        store.commit('forecast_hourly', response);
        api.forecastData(`${apiUrl}/daily?city=${city}&key=${accessKey}&days=6`).then((response) => {
          store.commit('forecast_daily', response);
          data.isLoading = false;
          data.collapsed = false;
        })
      })
    }
    getForecastData('Rio de Janeiro,BR');

    return {
      data,
      form,
      addingHours,
      addingDays,
      getSelectedCity,
      forecastDaily: computed(() => store.state.forecastDaily),
      forecastHourly: computed(() => store.state.forecastHourly),
    }
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.home--card {
  position: relative;
  box-sizing: border-box;
  max-height: 300px;
  max-width: 100%;
  overflow: hidden;
}

.home--card-loader-small {
  margin: 0 auto !important;
  max-width: 300px;
  transition: max-width .5s ease-out;
}

.home--card-loader-full {
  margin: 0 auto !important;
  max-width: 100%;
  transition: max-width .5s ease;
}

.home--card-actions-title {
  padding-bottom: 2rem;
}

.home--card-actions-title h2 {
  font-size: var(--font-size-xl);
}

.home--card-actions-title h4 {
  font-size: var(--font-size-base);
}

.home--card-button {
  align-self: flex-end;
}

.home--card-container {
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.home--card-disclaimer {
  padding-top: 1rem;
  display: block;
  text-align: center;
}

.home--card-result {
  opacity: 0;
  height: 0;
  visibility: hidden;
  text-align: center;
  transition: all .25s ease-in-out;
}

.home--card-result-container {
  width: 100%;
  margin-bottom: 0.8rem;
}

.home--card-result-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home--card-result-data-left {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.home--card-result-values h5 {
  text-align: right;
  font-size: var(--font-size-base);
  margin: 0;
  max-width: 30vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.home--card-result-values p {
  text-align: right;
  font-size: var(--font-size-xs);
  margin: 0;
}

.home--card-result-values-min {
  font-family: var(--font-family-nunito);
  font-weight: 300;
}

.home--card-see-more {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 8;
  left: 0;
  bottom: 0;
  height: 110px;
  width: 100%;
  cursor: pointer;
    background: linear-gradient(
    rgba(20, 17, 37, 0),
    rgba(20, 17, 37, 0.4),
   rgba(20, 17, 37, 0.7), 
    rgba(20, 17, 37, 0.9), 
   rgb(20, 17, 37)
  );
}

.home--card-see-more-click {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home--card-see-more-click {
  margin-top: 2rem;
}

.home--card-see-more-click img {
  transition: .5s;
  transform: rotate(0deg);
  width: 30px;
}

.home--card-collapsed  {
  max-height: 100% !important;
  transition: max-height 0.25s ease-in-out;
}

.home--card-buttons {
  padding-bottom: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.home--card--button {
  margin-bottom: .5rem;
}

.home--card-collapsed .home--card-see-more  img {
  transition: .5s;
  transform: rotate(180deg);
}

.home--card-opacity-0 {
  opacity: 0;
}

.home--card-opacity-1 {
  opacity: 1;
  height: 100%;
  margin-top: 1rem;
  margin-bottom: 3rem;
  visibility: visible;
  transition: opacity .25s ease-in-out;
}

@media (min-width: 400px){
  .home--card-buttons{
    padding-bottom: 2.5rem;
    width: 100%;
    flex-direction: row;
  }

  .home--card--button {
    margin-right: .5rem;
  }
}

@media (min-width: 567px){
  .home--card {
    max-height: 520px;
    box-sizing: border-box;
    margin: 0 3rem;
  }


  .home--card-result-values h5 {
    text-align: right;
    font-size: var(--font-size-base);
    margin: 0;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .home--card-result-values p {
    text-align: right;
    font-size: var(--font-size-xs);
    margin: 0;
  }

  .home--card-buttons{
    padding-bottom: 2.5rem;
    width: 100%;
    flex-direction: row;
  }

  .home--card--button {
    margin-right: .5rem;
  }

  .home--card-actions-title h2 {
    font-size: var(--font-size-xxl);
  }

  .home--card-actions-title h4 {
    font-size: var(--font-size-base);
  }
}

@media (min-width: 768px){
  .home--card-result {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

   .home--card-result-container {
    width: 49%;
    margin-bottom: 0.8rem;
  }
}

@media (min-width: 991px){
  .home--card-container {
    flex-direction: row;
  }
}

@media (min-width: 1200px){
  .home--card-container {
    flex-direction: row;
  }

  .home--card-result-container {
    width: 32%;
    margin-bottom: 0.8rem;
  }
}
</style>
