import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue';
import router from './router';
import api from'@/services/api.js'; // Import API service to set up Axios
import 'vue3-toastify/dist/index.css';
import './style.css';

import { registerPlugins } from '@/plugins'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);


app.use(createPinia());
app.use(vuetify);
app.use(router);
registerPlugins(app)
app.config.globalProperties.$axios = api; // Make API service available globally as $api

app.mount('#app');
