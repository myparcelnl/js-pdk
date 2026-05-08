import {createGlobalState} from '@vueuse/core';
import {createMyParcelSdk, type HttpMethod, type MyParcelSdk} from '@myparcel-dev/sdk';
import {type BackendEndpoint} from '@myparcel-dev/pdk-common';
import {AbstractPdkEndpoint} from '../endpoints';
import {PdkFetchClient} from '../PdkFetchClient';
import {useGlobalContext} from '../../composables';

/**
 * Do requests to the PDK admin Api.
 */
export const usePdkAdminApi = createGlobalState((): MyParcelSdk<AbstractPdkEndpoint> => {
  const globalContext = useGlobalContext();

  const client = new PdkFetchClient({
    baseUrl: globalContext.baseUrl,
  });

  const pdkEndpoints = Object.entries(globalContext.endpoints).map(([endpointName, options]) => {
    // Effectively cast null as 'undefined' to prevent the SDK casting the prefix property to the string 'null'.
    const property = typeof options.property === 'string' ? options.property : undefined;
    const responseProperty = typeof options.responseProperty === 'string' ? options.responseProperty : undefined;
    class PdkEndpoint extends AbstractPdkEndpoint {
      public readonly method = options.method.toUpperCase() as HttpMethod;
      public readonly name = endpointName as BackendEndpoint;
      public readonly path = options.path;
      public readonly property = property;
      // SDK will use `options.property` as fallback if this is undefined.
      public readonly responseProperty = responseProperty;
      public readonly useDataEnvelope = typeof options.useDataEnvelope === 'undefined' ? true : options.useDataEnvelope;
    }

    return new PdkEndpoint({
      headers: options.headers,
      parameters: options.parameters,
    });
  });

  return createMyParcelSdk(client, pdkEndpoints) as MyParcelSdk<AbstractPdkEndpoint>;
});
