import { getItem, setItem } from 'localforage';

export const persistStorage = {
  async getItemSafe<T>(key: string, defaultValue: T) {
   return await getItem<T>(key).then(res => (res === null ? defaultValue : res))
},

  setItemSafe<T>(key: string, value: T) {
    try {
      return setItem(key, value);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      return Promise.resolve(null);
    }
  },
  getItem<T>(key: string) { getItem<T>(key)}
};
