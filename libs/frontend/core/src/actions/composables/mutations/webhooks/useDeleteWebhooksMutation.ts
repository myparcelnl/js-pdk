/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName} from '@myparcel-pdk/common';
import {usePdkApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';

export const useDeleteWebhooksMutation = () => {
  return usePdkMutation(EndpointName.DELETE_WEBHOOKS, () => {
    const pdk = usePdkApi();
    // todo
    return pdk.deleteWebhooks();
  });
};
