import {createGlobalState} from '@vueuse/core';
import {type BackendEndpoint} from '@myparcel-pdk/common';
import {createMyParcelSdk, type HttpMethod, type MyParcelSdk} from '@myparcel/sdk';
import {AbstractPdkEndpoint} from '../endpoints/abstractPdkEndpoint';
import {PdkFetchClient} from '../PdkFetchClient';
import {useGlobalContext} from '../../composables/context/useGlobalContext';

/**
 * Do requests to the PDK admin Api.
 */
export const usePdkAdminApi = createGlobalState((): MyParcelSdk<AbstractPdkEndpoint> => {
  const globalContext = useGlobalContext();

  const client = new PdkFetchClient({
    baseUrl: globalContext.baseUrl,
  });

  const pdkEndpoints = Object.entries(globalContext.endpoints).map(([endpointName, options]) => {
    class PdkEndpoint extends AbstractPdkEndpoint {
      public readonly method = options.method.toUpperCase() as HttpMethod;
      public readonly name = endpointName as BackendEndpoint;
      public readonly path = options.path;
      public readonly property = options.property;
      public readonly responseProperty = options.responseProperty ?? options.property;
    }

    return new PdkEndpoint({
      headers: options.headers,
      parameters: options.parameters,
    });
  });

  return createMyParcelSdk(client, pdkEndpoints) as MyParcelSdk<AbstractPdkEndpoint>;
});
