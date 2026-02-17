import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  install: (app) => {
    app.config.globalProperties.$toast = Vue3Toastify;
    app.provide(toast, { position: "top-right", timeout: 3000, })
  }
}

