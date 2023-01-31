/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName} from '@myparcel-pdk/common';
import {usePdkApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useRefreshWebhooksMutation = () => {
  return usePdkMutation(EndpointName.REFRESH_WEBHOOKS, () => {
    const pdk = usePdkApi();
    // todo
    return pdk.refreshWebhooks();
  });
};
