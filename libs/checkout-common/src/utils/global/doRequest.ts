import {type FrontendEndpoint} from '@myparcel-pdk/common';
import {useSettings} from '../useSettings';
import {useConfig} from '../useConfig';
import {type FrontendEndpointParameters, type FrontendEndpointResponse} from '../../types';

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
