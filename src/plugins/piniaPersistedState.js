import { getStorageSync, setStorageSync } from '@tarojs/taro';

const hydrateStore = (store, { key }) => {
  try {
    const value = getStorageSync(key);
    if (value) store.$patch(value);
  } catch (error) {
    console.error('--> piniaPersistedState.hydrateStore', error);
  }
};

const persistState = (state, { key }) => {
  try {
    // 直接存储整个 state
    setStorageSync(key, state);
  } catch (error) {
    console.error('--> piniaPersistedState.persistState', error);
  }
};

export function createPersistedState() {
  return (context) => {
    const { options, store } = context;
    const { persist } = options;
    if (!persist) return;
    const currentId = `store_${persist.key}`;

    hydrateStore(store, { key: currentId });

    store.$subscribe(
      (_mutation, state) => {
        persistState(state, { key: currentId });
      },
      {
        detached: true,
      },
    );
  };
}
