import {EndpointOptions, usePdkApi} from '../../sdk';
import {ApiException} from '@myparcel/sdk';
import {EndpointName} from '@myparcel-pdk/common';
import {FormInstance} from '@myparcel/vue-form-builder';
import {formToBody} from '../../utils';
import {useMutation} from '@tanstack/vue-query';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUpdatePluginSettingsMutation = () =>
  useMutation<unknown, ApiException, FormInstance>([EndpointName.UPDATE_PLUGIN_SETTINGS], (form) => {
    const sdk = usePdkApi();

    const options: EndpointOptions<EndpointName.UPDATE_PLUGIN_SETTINGS> = {
      body: formToBody(form),
    };

    // @ts-expect-error todo
    return sdk.updatePluginSettings(options);
  });
