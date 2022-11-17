import {EndpointMap, EndpointName} from '@myparcel-pdk/frontend-shared';
import {FetchClient, HttpMethod, MyParcelSdk, createMyParcelSdk} from '@myparcel/sdk';
import {AbstractPdkEndpoint} from '../endpoints';
import {useContextStore} from '../../stores';

export const useSdk = <E extends EndpointName>(): MyParcelSdk<AbstractPdkEndpoint<E>> => {
  const contextStore = useContextStore();
  const endpoints = contextStore.context.global?.endpoints as EndpointMap;

  if (!endpoints) {
    throw new Error();
  }

  const pdkEndpoints = Object.entries(endpoints).map(([endpointName, options]) => {
    class PdkEndpoint extends AbstractPdkEndpoint {
      public readonly method = options.httpMethod.toUpperCase() as HttpMethod;
      public readonly name = endpointName as EndpointName;
      public readonly path = options.path;
      public readonly property = 'data';
    }

    return new PdkEndpoint({
      headers: options.headers,
      parameters: options.parameters,
    });
  });

  return createMyParcelSdk(
    new FetchClient({
      baseUrl: contextStore.context.global?.baseUrl,
    }),
    pdkEndpoints as AbstractPdkEndpoint<E>[],
  );
};
