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
 * Request interceptor. Calls the provider for every request, so a short-lived
 * token is always current.
 */
export const addRequestHeaders = async <T extends {headers?: RequestHeaders}>(options: T): Promise<T> => {
  if (!provider) {
    return options;
  }

  return {...options, headers: {...options.headers, ...(await provider())}};
};
