import {FetchClient, HttpMethod, MyParcelSdk, createMyParcelSdk} from '@myparcel/sdk';
import {AbstractPdkEndpoint} from './abstractPdkEndpoint';
import {EndpointName} from '@myparcel/pdk-frontend-shared';
import {useContextStore} from '../../stores';

export const useSdk = <E extends EndpointName>(): MyParcelSdk<AbstractPdkEndpoint<E>> => {
  const contextStore = useContextStore();
  const endpoints = contextStore.context.global?.endpoints;

  if (!endpoints) {
    throw new Error();
  }

  const pdkEndpoints = Object.entries(endpoints).map(([endpointName, options]) => {
    class PdkEndpoint extends AbstractPdkEndpoint {
      public readonly name = endpointName as EndpointName;
      public readonly method = options.httpMethod.toUpperCase() as HttpMethod;
      public readonly property = 'data';
      public readonly path = options.path;
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
