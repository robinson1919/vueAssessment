import vuetify from './vuetify/index'

import { useAppStore } from '@/stores/app'

export function registerPlugins (app) {
  const store = useAppStore();
  store.loadCampaign();
  
  app.use(vuetify)
}