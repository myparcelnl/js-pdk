import {resolve} from 'path';
import {promises} from 'fs';
import {toArray} from '@myparcel/ts-utils';

export const getItemsByParameter = async (key: string, parameter: unknown): Promise<Record<string, unknown>[]> => {
  const storage = await useStorage();

  if (!parameter) {
    const all = await promises.readdir(resolve(process.cwd(), 'data/db', key));

    parameter = all.map((item) => item.replace('.json', ''));
  }

  const items = toArray(parameter);

  const data = await Promise.all(items.map((item) => storage.getItem(`db:${key}/${item}.json`)));
  const json = JSON.stringify(data);
  const replaced = json.replace(/__API_URL__/gm, process.env.URL);

  return JSON.parse(replaced);
};
