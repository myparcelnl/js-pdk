import {AdminContextKey, BackendEndpoint} from '@myparcel-dev/pdk-common';
import {createMutationHandler} from '../executors';
import {defineAction} from '../defineAction';
import {AdminAction, AdminIcon} from '../../data';

/**
 * Update account.
 */
export const updateAccountAction = defineAction({
  name: AdminAction.AccountUpdate,
  icon: AdminIcon.Save,
  label: 'action_save',
  handler: createMutationHandler(BackendEndpoint.UpdateAccount),
  afterHandle(context) {
    if (!context.response?.[AdminContextKey.Dynamic]?.account) {
      context.instance.logger.error('Account not found');
    }

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
});
