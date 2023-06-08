<template>
  <PdkBox :loading="loading">
    <p>
      <span v-if="hasAccount">
        <StatusIndicator :status="Status.Success" />&nbsp;{{ translate('notification_account_connected') }}
      </span>
    </p>

    <TabNavigation
      :button-wrapper="prefixComponent(AdminComponent.ButtonGroup)"
      :button="prefixComponent(AdminComponent.Button)"
      :initial-tab="!hasAccount"
      :closeable="hasAccount"
      :tabs="tabs" />
  </PdkBox>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import {get} from '@vueuse/core';
import {type TabDefinition, Status, AdminComponent} from '@myparcel-pdk/common';
import TabNavigation from '../common/TabNavigation.vue';
import StatusIndicator from '../common/StatusIndicator.vue';
import {prefixComponent} from '../../helpers';
import {useLanguage, useStoreContextQuery} from '../../composables';
import {useUpdateAccountMutation} from '../../actions';
import WebhooksStatus from './WebhooksStatus.vue';
import EditApiKeyForm from './EditApiKeyForm.vue';

const contextQuery = useStoreContextQuery();

const updateAccount = useUpdateAccountMutation();

const hasApiKey = ref(Boolean(get(contextQuery.data)?.pluginSettings.account.apiKey));

const loading = computed(() => get(contextQuery.isLoading) || get(updateAccount.isLoading));

const hasAccount = computed(() => {
  return !loading.value && hasApiKey.value && Boolean(get(contextQuery.data)?.account);
});

const {translate} = useLanguage();

const tabs = computed(() => {
  const array: TabDefinition[] = [
    {
      name: 'apiKey',
      component: EditApiKeyForm,
      label: 'button_api_key_edit',
    },
  ];

  if (hasAccount.value) {
    array.push({
      name: 'webhooks',
      component: WebhooksStatus,
      label: 'button_webhooks_edit',
    });
  }

  return array;
});
</script>
