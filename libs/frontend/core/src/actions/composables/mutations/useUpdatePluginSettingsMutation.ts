/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {FormInstance} from '@myparcel/vue-form-builder';
import {fillOrderQueryData} from '../../../pdk';
import {formToBody} from '../../../utils';
import {usePdkApi} from '../../../sdk';

export interface UpdatePluginSettingsInput {
  form: FormInstance;
}

export const useUpdatePluginSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, UpdatePluginSettingsInput>(
    [EndpointName.UPDATE_PLUGIN_SETTINGS],
    (input) => {
      const sdk = usePdkApi();

      return sdk.updatePluginSettings({
        // @ts-expect-error todo
        body: formToBody(input.form),
      });
    },
    {
      onSuccess: (data) => {
        fillOrderQueryData(queryClient, data);
      },
    },
  );
};
