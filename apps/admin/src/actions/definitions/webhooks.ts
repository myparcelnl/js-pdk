import {BackendEndpoint, Variant} from '@myparcel-pdk/common';
import {createQueryHandler} from '../executors/createQueryHandler';
import {createMutationHandler} from '../executors/createMutationHandler';
import {defineAction} from '../defineAction';
import {AdminAction, AdminIcon} from '../../data/constants';

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
  variant: Variant.Error,
});
