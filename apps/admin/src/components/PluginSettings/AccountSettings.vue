<template>
  <PdkBox
    v-test="$.type.__name"
    :loading="loading">
    <p v-if="hasAccount">
      <StatusIndicator :status="Status.Success" />&nbsp;{{ translate('notification_account_connected') }}
    </p>

    <TabNavigation
      :button-wrapper="prefixComponent(AdminComponent.ButtonGroup)"
      :button="prefixComponent(AdminComponent.Button)"
      :initial-tab="!hasAccount"
      :closeable="hasAccount"
      :tabs="tabs">
      <template
        v-if="refreshAction"
        #button-wrapper>
        <ActionButton
          :action="refreshAction"
          :variant="Variant.Secondary"
          :size="Size.Small" />
      </template>
    </TabNavigation>
  </PdkBox>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {Size, Status, Variant} from '@myparcel-pdk/common';
import TabNavigation from '../common/TabNavigation.vue';
import StatusIndicator from '../common/StatusIndicator.vue';
import ActionButton from '../common/ActionButton.vue';
import {prefixComponent} from '../../utils';
import {type TabDefinition} from '../../types';
import {useActionStore} from '../../stores';
import {instantiateAction} from '../../services';
import {AdminComponent} from '../../data';
import {useLanguage, useStoreContextQuery} from '../../composables';
import {
  debugDownloadLogsAction,
  debugSendLogsAction,
  deleteAccountAction,
  refreshAccountAction,
  updateAccountAction,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
} from '../../actions';
import WebhooksStatus from './WebhooksStatus.vue';
import EditApiKeyForm from './EditApiKeyForm.vue';
import DebuggingSettings from './DebuggingSettings.vue';

const actionStore = useActionStore();

actionStore.register([updateAccountAction, deleteAccountAction, debugDownloadLogsAction, debugSendLogsAction]);

const contextQuery = useStoreContextQuery();

const updateAccount = useUpdateAccountMutation();
const deleteAccount = useDeleteAccountMutation();

const loading =
  computed(() => get(contextQuery.isLoading) || get(updateAccount.isLoading)) || get(deleteAccount.isLoading);

const hasApiKey = computed(() => Boolean(get(contextQuery.data)?.pluginSettings.account.apiKey));

const hasAccount = computed(() => !get(loading) && hasApiKey.value && Boolean(get(contextQuery.data)?.account));

const refreshAction = instantiateAction(refreshAccountAction);

const {translate} = useLanguage();

const tabs = computed(() => {
  const array: TabDefinition[] = [
    {
      name: 'apiKey',
      component: EditApiKeyForm,
      label: 'button_api_key_edit',
    },
  ];

  if (get(hasAccount)) {
    array.push({
      name: 'webhooks',
      component: WebhooksStatus,
      label: 'button_webhooks_edit',
    });

    array.push({
      name: 'debugging',
      component: DebuggingSettings,
      label: 'button_debugging_edit',
    });
  }

  return array;
});
</script>
