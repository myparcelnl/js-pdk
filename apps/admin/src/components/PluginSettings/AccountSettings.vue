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
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {Status} from '@myparcel-pdk/common';
import {StatusIndicator, TabNavigation} from '../common';
import {prefixComponent} from '../../utils/prefixComponent';
import type {TabDefinition} from '../../types/common.types';
import {useActionStore} from '../../stores/useActionStore';
import {AdminComponent} from '../../data/components';
import {useLanguage} from '../../composables/language/useLanguage';
import {useStoreContextQuery} from '../../composables/useStoreContextQuery';
import {useDeleteAccountMutation} from '../../actions/composables/mutations/account/useDeleteAccountMutation';
import {useUpdateAccountMutation} from '../../actions/composables/mutations/account/useUpdateAccountMutation';
import {deleteAccountAction, updateAccountAction} from '../../actions/definitions/account';
import WebhooksStatus from './WebhooksStatus.vue';
import EditApiKeyForm from './EditApiKeyForm.vue';
import DebugOptions from './DebugOptions.vue';

const actionStore = useActionStore();

actionStore.register([updateAccountAction, deleteAccountAction]);

const contextQuery = useStoreContextQuery();

const updateAccount = useUpdateAccountMutation();
const deleteAccount = useDeleteAccountMutation();

const loading =
  computed(() => get(contextQuery.isLoading) || get(updateAccount.isLoading)) || get(deleteAccount.isLoading);

const hasApiKey = computed(() => Boolean(get(contextQuery.data)?.pluginSettings.account.apiKey));

const hasAccount = computed(() => !get(loading) && hasApiKey.value && Boolean(get(contextQuery.data)?.account));

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

  array.push({
    name: 'debug',
    component: DebugOptions,
    label: 'button_debug',
  });

  return array;
});
</script>
