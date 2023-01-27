/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {ApiException} from '@myparcel/sdk';
import {EndpointName} from '@myparcel-pdk/common';
import {FormInstance} from '@myparcel/vue-form-builder';
import {useMutation} from '@tanstack/vue-query';
import {usePdkApi} from '../../../sdk';

export interface UpdateProductSettingsInput {
  form: FormInstance;
  productIds: string[];
}

export const useUpdateProductSettingsMutation = () => {
  return useMutation<unknown, ApiException, UpdateProductSettingsInput>(
    [EndpointName.UPDATE_PRODUCT_SETTINGS],
    ({form, productIds}) => {
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
    },
  );
};
