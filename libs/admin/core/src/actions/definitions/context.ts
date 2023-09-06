import {BackendEndpoint} from '@myparcel-pdk/admin-common';
import {createQueryHandler} from '../executors';
import {defineAction} from '../defineAction';
import {AdminAction, AdminContextKey} from '../../types';

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
