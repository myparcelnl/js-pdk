<template>
  <PdkButton
    variant="primary"
    @click="open = !open">
    {{ translate('button_webhooks_edit') }}
  </PdkButton>

  <div v-if="open">
    <PdkHeading level="3">{{ translate('notification_webhooks_connected') }}</PdkHeading>

    <ActionButton
      v-for="action in webhookActions"
      :key="action.id"
      :action="action" />

    <ul>
      <li
        v-for="webhook in fetchWebhooks.data"
        :key="webhook.hook">
        <StatusIndicator :status="getStatus(webhook)">
          <code v-text="webhook.hook" />
        </StatusIndicator>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {BackendEndpoint, Status, WebhookDefinition} from '@myparcel-pdk/common/src';
import {computed, defineComponent, ref} from 'vue';
import {useLanguage, useStoreQuery} from '../../composables';
import {webhooksCreateAction, webhooksDeleteAction} from '../../actions';
import ActionButton from '../common/ActionButton.vue';
import {ResolvedAction} from '../../types';
import StatusIndicator from '../common/StatusIndicator.vue';
import {createAction} from '../../services';
import {get} from '@vueuse/core';
import {partitionArray} from '@myparcel/ts-utils';

export default defineComponent({
  name: 'WebhooksStatus',
  components: {StatusIndicator, ActionButton},

  setup: () => {
    const {translate} = useLanguage();

    const open = ref(false);

    const fetchWebhooks = useStoreQuery(BackendEndpoint.FETCH_WEBHOOKS);
    const createWebhooks = useStoreQuery(BackendEndpoint.CREATE_WEBHOOKS);
    const deleteWebhooks = useStoreQuery(BackendEndpoint.DELETE_WEBHOOKS);

    return {
      open,
      translate,
      fetchWebhooks,
      webhookActions: computed(() => {
        const actions: ResolvedAction[] = [];
        const [connected, disconnected] = partitionArray(get(fetchWebhooks.data) ?? [], (webhook) => webhook.connected);

        actions.push(createAction(webhooksCreateAction, {hooks: disconnected.map(({hook}) => hook)}));

        if (connected.length) {
          actions.push(createAction(webhooksDeleteAction, {hooks: connected.map(({hook}) => hook)}));
        }

        return actions;
      }),

      getStatus: (webhook: WebhookDefinition): Status => {
        if (fetchWebhooks.isLoading || createWebhooks.isLoading || deleteWebhooks.isLoading) {
          return Status.PENDING;
        }

        return webhook.connected ? Status.SUCCESS : Status.ERROR;
      },
    };
  },
});
</script>
