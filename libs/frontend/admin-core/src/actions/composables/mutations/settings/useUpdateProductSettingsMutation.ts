/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';

export const useUpdateProductSettingsMutation = () => {
  return usePdkMutation(BackendEndpoint.UpdateProductSettings, ({form, productIds}) => {
    const pdk = usePdkAdminApi();

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
