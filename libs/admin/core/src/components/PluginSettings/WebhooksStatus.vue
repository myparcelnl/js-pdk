<template>
  <div v-test="$.type.__name">
    <PdkHeading level="2">
      {{ translate('settings_webhook_title') }}
    </PdkHeading>

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
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {Status, type WebhookDefinition} from '@myparcel-pdk/admin-common';
import {partitionArray} from '@myparcel/ts-utils';
import StatusIndicator from '../common/StatusIndicator.vue';
import ActionButton from '../common/ActionButton.vue';
import {type ActionDefinition} from '../../types';
import {useActionStore, useQueryStore} from '../../stores';
import {instantiateAction} from '../../services';
import {useLanguage} from '../../composables';
import {webhooksCreateAction, webhooksDeleteAction} from '../../actions';

const {fetchWebhooks, createWebhooks, deleteWebhooks} = useQueryStore().registerWebhookQueries();

useActionStore().registerWebhookActions();

const data = computed(() => get(fetchWebhooks.data) ?? []);

const webhooks = computed<(WebhookDefinition & {status: Status})[]>(() => {
  return data.value.map((webhook) => {
    let status = Status.Pending;

    if (!get(fetchWebhooks.isLoading) && !get(createWebhooks.isLoading) && !get(deleteWebhooks.isLoading)) {
      status = webhook.connected ? Status.Success : Status.Error;
    }

    return {...webhook, status};
  });
});

const webhookActions = computed(() => {
  const actions: ActionDefinition[] = [];
  const [connected, disconnected] = partitionArray(data.value, (webhook) => webhook.connected);

  if (disconnected.length) {
    actions.push(instantiateAction(webhooksCreateAction, {hooks: disconnected.map(({hook}) => hook)}));
  }

  if (connected.length) {
    actions.push(instantiateAction(webhooksDeleteAction, {hooks: connected.map(({hook}) => hook)}));
  }

  return actions;
});

const {translate} = useLanguage();
</script>
