export type RequestHeaders = Record<string, string>;

export type RequestHeadersProvider = () => RequestHeaders | Promise<RequestHeaders>;

/**
 * Module level, because the PDK API client is a global state that is often
 * created inside a query function, where inject() is not available.
 */
let provider: RequestHeadersProvider | undefined;

export const setRequestHeadersProvider = (newProvider: RequestHeadersProvider | undefined): void => {
  provider = newProvider;
};

/**
 * Header names are case-insensitive: drop an existing header that the provider
 * sets in another casing, so fetch does not send both values.
 */
const mergeHeaders = (headers: RequestHeaders, extraHeaders: RequestHeaders): RequestHeaders => {
  const extraNames = Object.keys(extraHeaders).map((name) => name.toLowerCase());
  const kept = Object.entries(headers).filter(([name]) => !extraNames.includes(name.toLowerCase()));

  return {...Object.fromEntries(kept), ...extraHeaders};
};

/**
 * Request interceptor. Calls the provider for every request, so a short-lived
 * token is always current.
 */
export const addRequestHeaders = async <T extends {headers?: RequestHeaders}>(options: T): Promise<T> => {
  if (!provider) {
    return options;
  }

  return {...options, headers: mergeHeaders(options.headers ?? {}, await provider())};
};
