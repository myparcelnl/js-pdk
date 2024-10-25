import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../usePdkMutation';
import {type ResolvedQuery} from '../../../../stores/types';
import {usePdkAdminApi} from '../../../../sdk/composables/usePdkAdminApi';

export const useUpdateProductSettingsMutation = (): ResolvedQuery<BackendEndpoint.UpdateProductSettings> => {
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
