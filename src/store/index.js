import { createStore } from 'vuex';

export default createStore({
  state: {
    forecastDaily: {},
    forecastHourly: {},
  },
  mutations: {
    forecast_hourly(state, forecastHourly) {
      state.forecastHourly = forecastHourly
    },
    forecast_daily(state, forecastDaily) {
      state.forecastDaily = forecastDaily
    },
  },
  actions: {
    setForecasthourly({ commit }, data) {
      commit('forecast_hourly', data)
    },
    setForecastDaily({ commit }, data) {
      commit('forecast_daily', data)
    }
  },
});
