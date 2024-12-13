import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import { createPersistedState } from '@/plugins/piniaPersistedState';

const pinia = createPinia();

export function setupStore(app) {
  pinia.use(createPersistedState());
  pinia.use(piniaPluginPersistedState);
  app.use(pinia);
}

export default pinia;
