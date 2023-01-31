import {FrontendAction, PdkIcon} from '../../types';
import {ActionContext, createMutator, createQueryFetcher, executeAction} from '../executors';
import {EndpointName} from '@myparcel-pdk/common';
import {defineAction} from '../defineAction';
import {useQueryStore} from '../../stores';
import {get} from '@vueuse/core';

export const webhooksFetchAction = defineAction({
  name: FrontendAction.WEBHOOKS_FETCH,
  label: 'action_fetch_webhooks',
  handler: createQueryFetcher(EndpointName.FETCH_WEBHOOKS),
});

export const webhooksCreateAction = defineAction({
  name: FrontendAction.WEBHOOKS_CREATE,
  icon: PdkIcon.ADD,
  label: 'action_create',
  handler: createMutator(EndpointName.CREATE_WEBHOOKS),
});

export const webhooksCreateAllAction = defineAction({
  id: 'webhooksCreateAll',
  icon: PdkIcon.ADD,
  label: 'action_create',
  async handler(context: ActionContext<undefined>) {
    const queryStore = useQueryStore();
    const webhookQuery = queryStore.get(EndpointName.FETCH_WEBHOOKS);

    console.log(webhookQuery.data);

    await Promise.all(
      (get(webhookQuery.data) ?? []).map(({hook}) => {
        return executeAction({...context, parameters: {hooks: [hook]}});
      }),
    );
  },
});

export const webhooksDeleteAction = defineAction({
  name: FrontendAction.WEBHOOKS_DELETE,
  icon: PdkIcon.DELETE,
  label: 'action_delete',
  handler: createMutator(EndpointName.DELETE_WEBHOOKS),
});
