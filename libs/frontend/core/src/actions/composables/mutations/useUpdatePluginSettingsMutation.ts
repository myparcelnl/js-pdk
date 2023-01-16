/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {EndpointOptions, usePdkApi} from '../../../sdk';
import {ApiException} from '@myparcel/sdk';
import {EndpointName} from '@myparcel-pdk/common';
import {FormInstance} from '@myparcel/vue-form-builder';
import {formToBody} from '../../../utils';
import {useMutation} from '@tanstack/vue-query';

export const useUpdatePluginSettingsMutation = () => {
  return useMutation<unknown, ApiException, FormInstance>([EndpointName.UPDATE_PLUGIN_SETTINGS], (form) => {
    const sdk = usePdkApi();

    const options: EndpointOptions<EndpointName.UPDATE_PLUGIN_SETTINGS> = {
      body: formToBody(form),
    };

    // @ts-expect-error todo
    return sdk.updatePluginSettings(options);
  });
};
