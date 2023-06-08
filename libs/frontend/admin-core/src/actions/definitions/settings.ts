import {BackendEndpoint} from '@myparcel-pdk/common';
import {createMutationHandler} from '../executors';
import {defineAction} from '../defineAction';
import {AdminAction, AdminIcon, type NamedAction} from '../../types';

export const pluginSettingsUpdateAction = defineAction<NamedAction<AdminAction.PluginSettingsUpdate>>({
  name: AdminAction.PluginSettingsUpdate,
  icon: AdminIcon.Save,
  label: 'action_save',
  handler: createMutationHandler(BackendEndpoint.UpdatePluginSettings),
});
