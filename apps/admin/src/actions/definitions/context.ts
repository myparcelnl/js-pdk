import {AdminContextKey, BackendEndpoint} from '@myparcel-pdk/common';
import {createQueryHandler} from '../executors/createQueryHandler';
import {defineAction} from '../defineAction';
import {AdminAction} from '../../data/constants';

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
