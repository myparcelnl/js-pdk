import {AdminAction, AdminIcon} from '../../types';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {createMutationHandler} from '../executors';
import {defineAction} from '../defineAction';

export const pluginSettingsUpdateAction = defineAction({
  name: AdminAction.PluginSettingsUpdate,
  icon: AdminIcon.Save,
  label: 'action_save',
  handler: createMutationHandler(BackendEndpoint.UpdatePluginSettings),
});
