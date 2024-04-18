import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from '../plugins/piniaPersistedState';

const pinia = createPinia();

export function setupStore(app: App<Element>) {
  pinia.use(createPersistedState());
  app.use(pinia);
}

export { pinia };
