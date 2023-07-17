import {BackendEndpoint} from '@myparcel-pdk/common';
import {createMutationHandler} from '../executors';
import {defineAction} from '../defineAction';
import {AdminAction, AdminIcon} from '../../types';

/**
 * Update account.
 */
export const updateAccountAction = defineAction({
  name: AdminAction.AccountUpdate,
  icon: AdminIcon.Save,
  label: 'action_save',
  handler: createMutationHandler(BackendEndpoint.UpdateAccount),
  afterHandle(context) {
    if (!context.response?.account) {
      context.instance.logger.error('Account not found');
      return context.response;
    }

    // TODO: Make this action properly interactive
    window.location.reload();
    // await Promise.all([
    //   executeNextAction(context, fetchDynamicContextAction),
    //   executeNextAction(context, fetchPluginSettingsViewContextAction),
    // ]);

    return context.response;
  },
});

/**
 * Refresh account.
 */
export const refreshAccountAction = defineAction({
  ...updateAccountAction,
  label: 'action_update_account',
});

/**
 * Delete account.
 */
export const deleteAccountAction = defineAction({
  name: AdminAction.AccountDelete,
  icon: AdminIcon.Delete,
  label: 'action_delete',
  handler: createMutationHandler(BackendEndpoint.DeleteAccount),
  afterHandle(context) {
    // TODO: Make this action properly interactive
    window.location.reload();

    return context.response;
  },
});
