import {BackendEndpoint} from '@myparcel-pdk/admin-common';
import {usePdkMutation} from '../usePdkMutation';
import {formToBody} from '../../../../utils';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';

export const useUpdatePluginSettingsMutation = (): ResolvedQuery<BackendEndpoint.UpdatePluginSettings> => {
  return usePdkMutation(BackendEndpoint.UpdatePluginSettings, ({form}) => {
    const pdk = usePdkAdminApi();

    return pdk.updatePluginSettings({
      // @ts-expect-error todo
      body: formToBody(form),
    });
  });
};
