import {createMutationHandler} from '../executors';
import {defineAction} from '../defineAction';
import {AdminAction, AdminIcon} from '../../types';
import {BackendEndpoint} from '../../data';

export const pluginSettingsUpdateAction = defineAction({
  name: AdminAction.PluginSettingsUpdate,
  icon: AdminIcon.Save,
  label: 'action_save',
  handler: createMutationHandler(BackendEndpoint.UpdatePluginSettings),
});
