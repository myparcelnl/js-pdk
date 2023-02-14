/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import {FetchClient, HttpMethod, MyParcelSdk, createMyParcelSdk} from '@myparcel/sdk';
import {AbstractPdkEndpoint} from '../endpoints';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {useGlobalContext} from '../../composables';

let sdk: ReturnType<typeof usePdkAdminApi>;

/**
 * Do requests to the PDK admin API.
 */
export const usePdkAdminApi = (): MyParcelSdk<AbstractPdkEndpoint> => {
  if (sdk) {
    return sdk;
  }

  const globalContext = useGlobalContext();

  const client = new FetchClient({
    baseUrl: globalContext.baseUrl,
  });

  const pdkEndpoints = Object.entries(globalContext.endpoints).map(([endpointName, options]) => {
    class PdkEndpoint extends AbstractPdkEndpoint {
      public readonly method = options.method.toUpperCase() as HttpMethod;
      public readonly name = endpointName as BackendEndpoint;
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
