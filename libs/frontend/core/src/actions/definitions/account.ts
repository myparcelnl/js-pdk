import {AdminAction, ContextKey, PdkIcon} from '../../types';
import {createMutator, createQueryFetcher, executeNextAction} from '../executors';
import {EndpointName} from '@myparcel-pdk/common';
import {defineAction} from '../defineAction';

/**
 * Retrieve context.
 */
export const fetchDynamicContextAction = defineAction({
  name: AdminAction.CONTEXT_FETCH,
  handler: createQueryFetcher(EndpointName.FETCH_CONTEXT, ContextKey.DYNAMIC),
});

export const fetchPluginSettingsViewContextAction = defineAction({
  name: AdminAction.CONTEXT_FETCH,
  handler: createQueryFetcher(EndpointName.FETCH_CONTEXT, ContextKey.PLUGIN_SETTINGS_VIEW),
});

/**
 * Update account.
 */
export const updateAccountAction = defineAction({
  name: AdminAction.ACCOUNT_UPDATE,
  icon: PdkIcon.SAVE,
  label: 'action_save',
  handler: createMutator(EndpointName.UPDATE_ACCOUNT),
  async afterHandle(context) {
    await Promise.all([
      executeNextAction(context, fetchDynamicContextAction),
      executeNextAction(context, fetchPluginSettingsViewContextAction),
    ]);

    return context.response;
  },
});
