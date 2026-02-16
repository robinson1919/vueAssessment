import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'

import App from './App.vue';
import router from './router';
import api from'@/services/api.js'; // Import API service to set up Axios
import './style.css';

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);


app.use(createPinia());
app.use(vuetify);
app.use(router);
app.config.globalProperties.$axios = api; // Make API service available globally as $api

app.mount('#app');
