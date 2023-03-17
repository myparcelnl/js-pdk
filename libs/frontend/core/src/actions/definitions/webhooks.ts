import {AdminAction, AdminIcon} from '../../types';
import {createMutationHandler, createQueryHandler} from '../executors';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {defineAction} from '../defineAction';

export const webhooksFetchAction = defineAction({
  name: AdminAction.WebhooksFetch,
  label: 'action_fetch_webhooks',
  handler: createQueryHandler(BackendEndpoint.FetchWebhooks),
});

export const webhooksCreateAction = defineAction({
  name: AdminAction.WebhooksCreate,
  icon: AdminIcon.Add,
  label: 'action_create',
  handler: createMutationHandler(BackendEndpoint.CreateWebhooks),
});

export const webhooksDeleteAction = defineAction({
  name: AdminAction.WebhooksDelete,
  icon: AdminIcon.Delete,
  label: 'action_delete',
  handler: createMutationHandler(BackendEndpoint.DeleteWebhooks),
});
