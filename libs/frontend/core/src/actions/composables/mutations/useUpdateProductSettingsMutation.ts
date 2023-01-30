/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {EndpointName} from '@myparcel-pdk/common';
import {usePdkApi} from '../../../sdk';
import {usePdkMutation} from './usePdkMutation';

export const useUpdateProductSettingsMutation = () => {
  return usePdkMutation(EndpointName.UPDATE_PRODUCT_SETTINGS, ({form, productIds}) => {
    const pdk = usePdkApi();

    const options = {
      params: {
        productIds,
      },
      body: {
        [form.name]: form.getValues(),
      },
    };

    // @ts-expect-error custom endpoints are not typed correctly
    return pdk.updateProductSettings(options);
  });
};
