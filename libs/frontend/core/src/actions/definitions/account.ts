import {AdminAction, AdminContextKey, AdminIcon} from '../../types';
import {createMutator, createQueryFetcher, executeNextAction} from '../executors';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {defineAction} from '../defineAction';

/**
 * Retrieve context.
 */
export const fetchDynamicContextAction = defineAction({
  name: AdminAction.ContextFetch,
  handler: createQueryFetcher(BackendEndpoint.FetchContext, AdminContextKey.Dynamic),
});

export const fetchPluginSettingsViewContextAction = defineAction({
  name: AdminAction.ContextFetch,
  handler: createQueryFetcher(BackendEndpoint.FetchContext, AdminContextKey.PluginSettingsView),
});

/**
 * Update account.
 */
export const updateAccountAction = defineAction({
  name: AdminAction.AccountUpdate,
  icon: AdminIcon.Save,
  label: 'action_save',
  handler: createMutator(BackendEndpoint.UpdateAccount),
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
