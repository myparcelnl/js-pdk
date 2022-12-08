/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import {FetchClient, HttpMethod, MyParcelSdk, createMyParcelSdk} from '@myparcel/sdk';
import {AbstractPdkEndpoint} from '../endpoints';
import {EndpointName} from '@myparcel-pdk/common';
import {useContextStore} from '../../stores';

let sdk: ReturnType<typeof usePdkApi>;

/**
 * Do requests to the PDK API.
 */
export const usePdkApi = (): MyParcelSdk<AbstractPdkEndpoint> => {
  if (sdk) {
    return sdk;
  }

  const contextStore = useContextStore();

  if (!contextStore.context.global.endpoints) {
    throw new Error('Endpoints are not available');
  }

  const client = new FetchClient({
    baseUrl: contextStore.context.global.baseUrl,
  });

  const pdkEndpoints = Object.entries(contextStore.context.global.endpoints).map(([endpointName, options]) => {
    class PdkEndpoint extends AbstractPdkEndpoint {
      public readonly method = options.method.toUpperCase() as HttpMethod;
      public readonly name = endpointName as EndpointName;
      public readonly path = options.path;
      public readonly property = options.property;
    }

    return new PdkEndpoint({
      headers: options.headers,
      parameters: options.parameters,
    });
  });

  sdk = createMyParcelSdk(client, pdkEndpoints);

  return sdk;
};
