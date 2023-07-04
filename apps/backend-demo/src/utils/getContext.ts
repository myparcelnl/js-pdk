import {type H3Event} from 'h3';
import {getItemsByParameter} from './getItemsByParameter';

export const getContext = async (event: H3Event) => {
  const query = getQuery(event);
  const headers = await getHeaders(event);

  const data = await getItemsByParameter('context', query.context);

  // Dynamically translations to global context response
  if (query.context === 'global') {
    const storage = useStorage();
    const acceptLanguage = headers['accept-language'] ?? 'en';

    // @ts-expect-error todo
    data[0].global.translations = await storage.getItem(`translations:${acceptLanguage}.json`);
  }

  return data;
};
