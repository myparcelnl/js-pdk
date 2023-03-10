<template>
  <PdkBox>
    <h2>{{ translate('settings_webhook_title') }}</h2>

    <PdkButtonGroup>
      <ActionButton
        v-for="action in webhookActions"
        :key="action.id"
        :action="action" />
    </PdkButtonGroup>

    <ul v-if="webhooks.length">
      <li
        v-for="webhook in webhooks"
        :key="webhook.hook">
        <StatusIndicator :status="webhook.status">
          <code v-text="webhook.hook" />
        </StatusIndicator>
      </li>
    </ul>

    <PdkLoader v-else />
  </PdkBox>
</template>

<script setup lang="ts">
import {BackendEndpoint, Status, WebhookDefinition} from '@myparcel-pdk/common/src';
import {
  useCreateWebhooksMutation,
  useDeleteWebhooksMutation,
  useFetchWebhooksQuery,
  webhooksCreateAction,
  webhooksDeleteAction,
} from '../../actions';
import ActionButton from '../common/ActionButton.vue';
import {ActionDefinition} from '../../types';
import StatusIndicator from '../common/StatusIndicator.vue';
import {computed} from 'vue';
import {defineActions} from '../../services';
import {get} from '@vueuse/core';
import {partitionArray} from '@myparcel/ts-utils';
import {useLanguage} from '../../composables';
import {useQueryStore} from '../../stores';

const queryStore = useQueryStore();

const fetchWebhooks = queryStore.register(BackendEndpoint.FETCH_WEBHOOKS, useFetchWebhooksQuery());
const createWebhooks = queryStore.register(BackendEndpoint.CREATE_WEBHOOKS, useCreateWebhooksMutation());
const deleteWebhooks = queryStore.register(BackendEndpoint.DELETE_WEBHOOKS, useDeleteWebhooksMutation());

const webhooks = computed<(WebhookDefinition & {status: Status})[]>(() => {
  return (get(fetchWebhooks.data) ?? []).map((webhook) => {
    let status = Status.PENDING;

    if (!get(fetchWebhooks.isLoading) && !get(createWebhooks.isLoading) && !get(deleteWebhooks.isLoading)) {
      status = webhook.connected ? Status.SUCCESS : Status.ERROR;
    }

    return {...webhook, status};
  });
});

const webhookActions = computed(() => {
  const actions: ActionDefinition[] = [];
  const [connected, disconnected] = partitionArray(get(fetchWebhooks.data) ?? [], (webhook) => webhook.connected);

  actions.push(...defineActions(webhooksCreateAction, {hooks: disconnected.map(({hook}) => hook)}));

  if (connected.length) {
    actions.push(...defineActions(webhooksDeleteAction, {hooks: connected.map(({hook}) => hook)}));
  }

  return actions;
});

const {translate} = useLanguage();
</script>
