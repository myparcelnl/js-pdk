import {AdminAction, AdminIcon} from '../../types';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {createMutator} from '../executors';
import {defineAction} from '../defineAction';

export const pluginSettingsUpdateAction = defineAction({
  name: AdminAction.PLUGIN_SETTINGS_UPDATE,
  icon: AdminIcon.SAVE,
  label: 'action_save',
  handler: createMutator(BackendEndpoint.UPDATE_PLUGIN_SETTINGS),
});
