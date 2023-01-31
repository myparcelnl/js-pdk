import {FrontendAction, PdkIcon} from '../../types';
import {EndpointName} from '@myparcel-pdk/common';
import {createMutator} from '../executors';
import {defineAction} from '../defineAction';

export const webhooksCreateAction = defineAction({
  name: FrontendAction.WEBHOOKS_CREATE,
  icon: PdkIcon.ADD,
  label: 'action_create',
  handler: createMutator(EndpointName.CREATE_WEBHOOKS),
});

export const webhooksDeleteAction = defineAction({
  name: FrontendAction.WEBHOOKS_DELETE,
  icon: PdkIcon.DELETE,
  label: 'action_delete',
  handler: createMutator(EndpointName.DELETE_WEBHOOKS),
});

export const webhooksRefreshAction = defineAction({
  name: FrontendAction.WEBHOOKS_REFRESH,
  icon: PdkIcon.REFRESH,
  label: 'action_refresh',
  handler: createMutator(EndpointName.REFRESH_WEBHOOKS),
});
