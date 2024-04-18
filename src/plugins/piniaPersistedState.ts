import { getStorageSync, setStorageSync } from '@tarojs/taro';

const hydrateStore = (store: { $patch: (arg0: any) => void }, { key }: { key: string }) => {
  try {
    const value = getStorageSync(key);
    if (value) store.$patch(value);
  } catch (error) {
    console.error('--> piniaPersistedState.hydrateStore', error);
  }
};

const persistState = (state: { [x: string]: any }, { key, paths }: { key: string; paths: any }) => {
  try {
    if (!Array.isArray(paths)) return;
    const toStore = paths.reduce((total, cur) => (state[cur] ? { ...total, [cur]: state[cur] } : total), {});
    setStorageSync(key, toStore);
  } catch (error) {
    console.error('--> piniaPersistedState.persistState', error);
  }
};

export function createPersistedState() {
  return (context: { options: any; store: any }) => {
    const { options, store } = context;
    const { id, persist } = options;

    if (!persist) return;
    const currentId = `store_${id}`;
    const { paths } = persist;

    hydrateStore(store, { key: currentId });

    store.$subscribe(
      (_mutation: any, state: { [x: string]: any }) => {
        persistState(state, { key: currentId, paths });
      },
      {
        detached: true,
      },
    );
  };
}
