import {BackendEndpoint} from '@myparcel-pdk/common';
import {createMutationHandler, createQueryHandler} from '../executors';
import {defineAction} from '../defineAction';
import {AdminAction, AdminContextKey, AdminIcon} from '../../types';

/**
 * Retrieve context.
 */
export const fetchDynamicContextAction = defineAction({
  name: AdminAction.ContextFetch,
  handler: createQueryHandler(BackendEndpoint.FetchContext, AdminContextKey.Dynamic),
});

export const fetchPluginSettingsViewContextAction = defineAction({
  name: AdminAction.ContextFetch,
  handler: createQueryHandler(BackendEndpoint.FetchContext, AdminContextKey.PluginSettingsView),
});

/**
 * Update account.
 */
export const updateAccountAction = defineAction({
  name: AdminAction.AccountUpdate,
  icon: AdminIcon.Save,
  label: 'action_save',
  handler: createMutationHandler(BackendEndpoint.UpdateAccount),
  afterHandle(context) {
    if (!context.response?.[0].dynamic?.account) {
      context.instance.logger.error('Account not found');
      return context.response;
    }

    // TODO: Make this action properly interactive
    // await Promise.all([
    //   executeNextAction(context, fetchDynamicContextAction),
    //   executeNextAction(context, fetchPluginSettingsViewContextAction),
    // ]);

    return context.response;
  },
});
