/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {ApiException} from '@myparcel/sdk';
import {EndpointName} from '@myparcel-pdk/common';
import {FormInstance} from '@myparcel/vue-form-builder';
import {formToBody} from '../../../utils';
import {useMutation} from '@tanstack/vue-query';
import {usePdkApi} from '../../../sdk';

type UpdatePluginSettingsInput = {
  form: FormInstance;
};

export const useUpdatePluginSettingsMutation = () => {
  return useMutation<unknown, ApiException, UpdatePluginSettingsInput>(
    [EndpointName.UPDATE_PLUGIN_SETTINGS],
    ({form}) => {
      const pdk = usePdkApi();

      return pdk.updatePluginSettings({
        // @ts-expect-error todo
        body: formToBody(form),
      });
    },
  );
};
