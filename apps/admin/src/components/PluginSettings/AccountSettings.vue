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
      :tabs="tabs">
      <template
        v-if="refreshAction"
        #button-wrapper>
        <ActionButton
          :action="refreshAction"
          :size="Size.Small"
          :variant="Variant.Secondary" />
      </template>
    </TabNavigation>
  </PdkBox>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {Size, Status, Variant} from '@myparcel-pdk/common';
import {ActionButton, StatusIndicator, TabNavigation} from '../common';
import {prefixComponent} from '../../utils';
import {type TabDefinition} from '../../types';
import {useActionStore} from '../../stores';
import {instantiateAction} from '../../services';
import {AdminComponent} from '../../data';
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
  }

  return array;
});
</script>
