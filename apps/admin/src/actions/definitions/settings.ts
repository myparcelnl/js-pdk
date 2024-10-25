import {BackendEndpoint} from '@myparcel-pdk/common';
import {createMutationHandler} from '../executors/createMutationHandler';
import {defineAction} from '../defineAction';
import {AdminAction, AdminIcon} from '../../data/constants';

export const pluginSettingsUpdateAction = defineAction({
  name: AdminAction.PluginSettingsUpdate,
  icon: AdminIcon.Save,
  label: 'action_save',
  handler: createMutationHandler(BackendEndpoint.UpdatePluginSettings),
});
