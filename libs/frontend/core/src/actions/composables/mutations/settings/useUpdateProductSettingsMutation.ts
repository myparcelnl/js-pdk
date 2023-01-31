/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName} from '@myparcel-pdk/common';
import {usePdkApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';

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
