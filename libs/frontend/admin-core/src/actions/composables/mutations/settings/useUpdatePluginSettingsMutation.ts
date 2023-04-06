/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {formToBody} from '../../../../utils';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';

export const useUpdatePluginSettingsMutation = () => {
  return usePdkMutation(BackendEndpoint.UpdatePluginSettings, ({form}) => {
    const pdk = usePdkAdminApi();

    return pdk.updatePluginSettings({
      // @ts-expect-error todo
      body: formToBody(form),
    });
  });
};
