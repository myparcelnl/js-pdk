import {AdminAction, PdkIcon} from '../../types';
import {createMutator, createQueryFetcher} from '../executors';
import {EndpointName} from '@myparcel-pdk/common/src';
import {defineAction} from '../defineAction';

export const webhooksFetchAction = defineAction({
  name: AdminAction.WEBHOOKS_FETCH,
  label: 'action_fetch_webhooks',
  handler: createQueryFetcher(EndpointName.FETCH_WEBHOOKS),
});

export const webhooksCreateAction = defineAction({
  name: AdminAction.WEBHOOKS_CREATE,
  icon: PdkIcon.ADD,
  label: 'action_create',
  handler: createMutator(EndpointName.CREATE_WEBHOOKS),
});

export const webhooksDeleteAction = defineAction({
  name: AdminAction.WEBHOOKS_DELETE,
  icon: PdkIcon.DELETE,
  label: 'action_delete',
  handler: createMutator(EndpointName.DELETE_WEBHOOKS),
});
