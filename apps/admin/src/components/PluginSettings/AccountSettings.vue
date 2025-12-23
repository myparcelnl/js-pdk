<template>
  <PdkBox
    v-test="$.type.__name"
    :loading="loading">
    <p v-if="hasAccount">
      <StatusIndicator :status="Status.Success" />&nbsp;{{ translate('notification_account_connected') }}
    </p>

    <TabNavigation
      :button="prefixComponent(AdminComponent.Button)"
      :button-wrapper="prefixComponent(AdminComponent.ButtonGroup)"
      :closeable="hasAccount"
      :initial-tab="!hasAccount"
      :tabs="tabs" />
  </PdkBox>
</template>

<script lang="ts" setup>
import {computed, toValue} from 'vue';
import {Status} from '@myparcel-dev/pdk-common';
import {StatusIndicator, TabNavigation} from '../common';
import {prefixComponent} from '../../utils';
import {type TabDefinition} from '../../types';
import {useActionStore} from '../../stores';
import {AdminComponent} from '../../data';
import {useLanguage, useStoreContextQuery} from '../../composables';
import {
  deleteAccountAction,
  updateAccountAction,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
} from '../../actions';
import WebhooksStatus from './WebhooksStatus.vue';
import EditApiKeyForm from './EditApiKeyForm.vue';
import DebugOptions from './DebugOptions.vue';

const actionStore = useActionStore();

actionStore.register([updateAccountAction, deleteAccountAction]);

const contextQuery = useStoreContextQuery();

const updateAccount = useUpdateAccountMutation();
const deleteAccount = useDeleteAccountMutation();

const loading =
  computed(() => toValue(contextQuery.isLoading) || toValue(updateAccount.isLoading)) ||
  toValue(deleteAccount.isLoading);

const hasApiKey = computed(() => Boolean(toValue(contextQuery.data)?.pluginSettings.account.apiKey));

const hasAccount = computed(() => !toValue(loading) && hasApiKey.value && Boolean(toValue(contextQuery.data)?.account));

const {translate} = useLanguage();

const tabs = computed(() => {
  const array: TabDefinition[] = [
    {
      name: 'apiKey',
      component: EditApiKeyForm,
      label: 'button_api_key_edit',
    },
  ];

  if (toValue(hasAccount)) {
    array.push({
      name: 'webhooks',
      component: WebhooksStatus,
      label: 'button_webhooks_edit',
    });
  }

  array.push({
    name: 'debug',
    component: DebugOptions,
    label: 'button_debug',
  });

  return array;
});
</script>
