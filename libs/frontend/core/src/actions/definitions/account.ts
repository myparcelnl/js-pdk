import {AdminAction, AdminContextKey, AdminIcon} from '../../types';
import {createMutator, createQueryFetcher, executeNextAction} from '../executors';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {defineAction} from '../defineAction';

/**
 * Retrieve context.
 */
export const fetchDynamicContextAction = defineAction({
  name: AdminAction.CONTEXT_FETCH,
  handler: createQueryFetcher(BackendEndpoint.FETCH_CONTEXT, AdminContextKey.DYNAMIC),
});

export const fetchPluginSettingsViewContextAction = defineAction({
  name: AdminAction.CONTEXT_FETCH,
  handler: createQueryFetcher(BackendEndpoint.FETCH_CONTEXT, AdminContextKey.PLUGIN_SETTINGS_VIEW),
});

/**
 * Update account.
 */
export const updateAccountAction = defineAction({
  name: AdminAction.ACCOUNT_UPDATE,
  icon: AdminIcon.SAVE,
  label: 'action_save',
  handler: createMutator(BackendEndpoint.UPDATE_ACCOUNT),
  async afterHandle(context) {
    if (context.response === undefined) {
      context.instance.logger.error('Account not found');
      return context.response;
    }

    await Promise.all([
      executeNextAction(context, fetchDynamicContextAction),
      executeNextAction(context, fetchPluginSettingsViewContextAction),
    ]);

    return context.response;
  },
});
