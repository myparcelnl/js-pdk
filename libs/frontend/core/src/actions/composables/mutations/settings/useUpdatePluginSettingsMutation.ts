/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName} from '@myparcel-pdk/common/src';
import {formToBody} from '../../../../utils';
import {usePdkApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';

export const useUpdatePluginSettingsMutation = () => {
  return usePdkMutation(EndpointName.UPDATE_PLUGIN_SETTINGS, ({form}) => {
    const pdk = usePdkApi();

    return pdk.updatePluginSettings({
      // @ts-expect-error todo
      body: formToBody(form),
    });
  });
};
