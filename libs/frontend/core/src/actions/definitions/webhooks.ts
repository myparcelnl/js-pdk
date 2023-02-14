import {AdminAction, AdminIcon} from '../../types';
import {createMutator, createQueryFetcher} from '../executors';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {defineAction} from '../defineAction';

export const webhooksFetchAction = defineAction({
  name: AdminAction.WEBHOOKS_FETCH,
  label: 'action_fetch_webhooks',
  handler: createQueryFetcher(BackendEndpoint.FETCH_WEBHOOKS),
});

export const webhooksCreateAction = defineAction({
  name: AdminAction.WEBHOOKS_CREATE,
  icon: AdminIcon.ADD,
  label: 'action_create',
  handler: createMutator(BackendEndpoint.CREATE_WEBHOOKS),
});

export const webhooksDeleteAction = defineAction({
  name: AdminAction.WEBHOOKS_DELETE,
  icon: AdminIcon.DELETE,
  label: 'action_delete',
  handler: createMutator(BackendEndpoint.DELETE_WEBHOOKS),
});
