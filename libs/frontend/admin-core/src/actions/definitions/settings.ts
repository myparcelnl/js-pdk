import {BackendEndpoint} from '@myparcel-pdk/common';
import {createMutationHandler} from '../executors';
import {defineAction} from '../defineAction';
import {AdminAction, AdminIcon} from '../../types';

export const pluginSettingsUpdateAction = defineAction({
  name: AdminAction.PluginSettingsUpdate,
  icon: AdminIcon.Save,
  label: 'action_save',
  handler: createMutationHandler(BackendEndpoint.UpdatePluginSettings),
});
