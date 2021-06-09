import { createApp } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import App from './App.vue';
import router from './router';
import store from './store';

// Importing the global css file
import '@/css/styles.css';

const app = createApp(App)
app.use(VueApexCharts);
app.use(store);
app.use(router);
app.mount('#app');
