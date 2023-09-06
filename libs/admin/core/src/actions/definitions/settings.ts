import {AdminIcon, BackendEndpoint} from '@myparcel-pdk/admin-common';
import {createMutationHandler} from '../executors';
import {defineAction} from '../defineAction';
import {AdminAction} from '../../types';

export const pluginSettingsUpdateAction = defineAction({
  name: AdminAction.PluginSettingsUpdate,
  icon: AdminIcon.Save,
  label: 'action_save',
  handler: createMutationHandler(BackendEndpoint.UpdatePluginSettings),
});
