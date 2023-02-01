import {ActionContext, createMutator, createQueryFetcher, executeAction} from '../executors';
import {FrontendAction, PdkIcon} from '../../types';
import {EndpointName} from '@myparcel-pdk/common';
import {defineAction} from '../defineAction';
import {get} from '@vueuse/core';
import {useStoreQuery} from '../../composables';

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
    const webhookQuery = useStoreQuery(EndpointName.FETCH_WEBHOOKS);

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
