/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../orders';
import {formToBody} from '../../../../utils';
import {usePdkAdminApi} from '../../../../sdk';

export const useUpdatePluginSettingsMutation = () => {
  return usePdkMutation(BackendEndpoint.UpdatePluginSettings, ({form}) => {
    const pdk = usePdkAdminApi();

    return pdk.updatePluginSettings({
      body: formToBody(form),
    });
  });
};
