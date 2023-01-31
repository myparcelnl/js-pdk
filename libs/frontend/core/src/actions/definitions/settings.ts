import {FrontendAction, PdkIcon} from '../../types';
import {EndpointName} from '@myparcel-pdk/common';
import {createMutator} from '../executors';
import {defineAction} from '../defineAction';

export const pluginSettingsUpdateAction = defineAction({
  name: FrontendAction.PLUGIN_SETTINGS_UPDATE,
  icon: PdkIcon.SAVE,
  label: 'action_save',
  handler: createMutator(EndpointName.UPDATE_PLUGIN_SETTINGS),
});
