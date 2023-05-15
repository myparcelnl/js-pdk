import {FrontendEndpointParameters, FrontendEndpointResponse} from '../../types/endpoints.types';
import {useConfig, useSettings} from '@myparcel-pdk/frontend-checkout-core/src';
import {FrontendEndpoint} from '@myparcel-pdk/common/src';

type DoRequest = <E extends FrontendEndpoint>(
  endpoint: E,
  parameters?: FrontendEndpointParameters<E>,
) => Promise<FrontendEndpointResponse<E>>;

export const doRequest: DoRequest = (endpoint, parameters) => {
  const config = useConfig();
  const settings = useSettings();

  const {baseUrl, endpoints} = settings.actions;

  return config.doRequest({
    ...endpoints[endpoint],
    parameters: {
      ...endpoints[endpoint].parameters,
      ...parameters,
    },
    baseUrl,
  });
};