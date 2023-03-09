import {toArray} from '@myparcel/ts-utils';

export const getItemsByParameter = async (key: string, parameter: unknown): Promise<Record<string, unknown>[]> => {
  const storage = await useStorage();
  const items = toArray(parameter);

  return Promise.all(items.map((item) => storage.getItem(`db:${key}/${item}.json`)));
};
