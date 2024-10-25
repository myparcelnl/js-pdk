import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../usePdkMutation';
import {formToBody} from '../../../../utils/forms/formToBody';
import {type ResolvedQuery} from '../../../../stores/types';
import {usePdkAdminApi} from '../../../../sdk/composables/usePdkAdminApi';

export const useUpdatePluginSettingsMutation = (): ResolvedQuery<BackendEndpoint.UpdatePluginSettings> => {
  return usePdkMutation(BackendEndpoint.UpdatePluginSettings, ({form}) => {
    const pdk = usePdkAdminApi();

    return pdk.updatePluginSettings({
      // @ts-expect-error todo
      body: formToBody(form),
    });
  });
};
