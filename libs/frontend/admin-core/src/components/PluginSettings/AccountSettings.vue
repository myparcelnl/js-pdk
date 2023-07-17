<template>
  <PdkBox :loading="loading">
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
import {computed, ref} from 'vue';
import {get} from '@vueuse/core';
import {AdminComponent, Size, Status, type TabDefinition, Variant} from '@myparcel-pdk/common';
import TabNavigation from '../common/TabNavigation.vue';
import StatusIndicator from '../common/StatusIndicator.vue';
import ActionButton from '../common/ActionButton.vue';
import {useActionStore} from '../../stores';
import {instantiateAction} from '../../services';
import {prefixComponent} from '../../helpers';
import {useLanguage, useStoreContextQuery} from '../../composables';
import {
  deleteAccountAction,
  refreshAccountAction,
  updateAccountAction,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
} from '../../actions';
import WebhooksStatus from './WebhooksStatus.vue';
import EditApiKeyForm from './EditApiKeyForm.vue';

const actionStore = useActionStore();

actionStore.register([updateAccountAction, deleteAccountAction]);

const contextQuery = useStoreContextQuery();

const updateAccount = useUpdateAccountMutation();
const deleteAccount = useDeleteAccountMutation();

const loading =
  computed(() => get(contextQuery.isLoading) || get(updateAccount.isLoading)) || get(deleteAccount.isLoading);

const hasApiKey = ref(Boolean(get(contextQuery.data)?.pluginSettings.account.apiKey));

const hasAccount = computed(() => {
  return !loading.value && hasApiKey.value && Boolean(get(contextQuery.data)?.account);
});

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
