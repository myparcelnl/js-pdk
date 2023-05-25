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

<script lang="ts" setup>
import {Status, WebhookDefinition} from '@myparcel-pdk/common';
import {useActionStore, useQueryStore} from '../../stores';
import {webhooksCreateAction, webhooksDeleteAction} from '../../actions';
import ActionButton from '../common/ActionButton.vue';
import {ActionDefinition} from '../../types';
import StatusIndicator from '../common/StatusIndicator.vue';
import {computed} from 'vue';
import {defineActions} from '../../services';
import {get} from '@vueuse/core';
import {partitionArray} from '@myparcel/ts-utils';
import {useLanguage} from '../../composables';

const {fetchWebhooks, createWebhooks, deleteWebhooks} = useQueryStore().registerWebhookQueries();

useActionStore().registerWebhookActions();

const webhooks = computed<(WebhookDefinition & {status: Status})[]>(() => {
  return (get(fetchWebhooks.data) ?? []).map((webhook) => {
    let status = Status.Pending;

    if (!get(fetchWebhooks.isLoading) && !get(createWebhooks.isLoading) && !get(deleteWebhooks.isLoading)) {
      status = webhook.connected ? Status.Success : Status.Error;
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
