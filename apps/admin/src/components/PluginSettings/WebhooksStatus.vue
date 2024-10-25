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
import {Status} from '@myparcel-pdk/common';
import {partitionArray} from '@myparcel/ts-utils';
import {ActionButton, StatusIndicator} from '../common';
import type {ActionDefinition} from '../../types/actions.types';
import type {WebhookDefinition} from '../../types/common.types';
import {useActionStore} from '../../stores/useActionStore';
import {useQueryStore} from '../../stores/useQueryStore';
import {instantiateAction} from '../../services/instantiateAction';
import {useLanguage} from '../../composables/language/useLanguage';
import {webhooksCreateAction, webhooksDeleteAction} from '../../actions/definitions/webhooks';

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
