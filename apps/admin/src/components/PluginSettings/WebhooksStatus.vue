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
import {computed, toValue} from 'vue';
import {Status} from '@myparcel-pdk/common';
import {partitionArray} from '@myparcel/ts-utils';
import {ActionButton, StatusIndicator} from '../common';
import {type ActionDefinition, type WebhookDefinition} from '../../types';
import {useActionStore, useQueryStore} from '../../stores';
import {instantiateAction} from '../../services';
import {useLanguage} from '../../composables';
import {webhooksCreateAction, webhooksDeleteAction} from '../../actions';

const {fetchWebhooks, createWebhooks, deleteWebhooks} = useQueryStore().registerWebhookQueries();

useActionStore().registerWebhookActions();

const data = computed(() => toValue(fetchWebhooks.data) ?? []);

const webhooks = computed<(WebhookDefinition & {status: Status})[]>(() => {
  return data.value.map((webhook) => {
    let status = Status.Pending;

    if (!toValue(fetchWebhooks.isLoading) && !toValue(createWebhooks.isLoading) && !toValue(deleteWebhooks.isLoading)) {
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
