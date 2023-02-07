<template>
  <PdkPluginSettingsWrapper v-test>
    <AccountSettings />

    <PluginSettingsForms />
  </PdkPluginSettingsWrapper>
</template>

<script lang="ts" setup>
/**
 * Plugin settings screen.
 */
import {
  useCreateWebhooksMutation,
  useDeleteWebhooksMutation,
  useFetchWebhooksQuery,
  useUpdateAccountMutation,
  useUpdatePluginSettingsMutation,
} from '../actions';
import AccountSettings from '../components/PluginSettings/AccountSettings.vue';
import {ContextKey} from '../types';
import {EndpointName} from '@myparcel-pdk/common/src';
import PluginSettingsForms from '../components/PluginSettings/PluginSettingsForms.vue';
import {useQueryStore} from '../stores';

const queryStore = useQueryStore();

queryStore.registerContextQueries(ContextKey.PLUGIN_SETTINGS_VIEW);

queryStore.register(EndpointName.UPDATE_ACCOUNT, useUpdateAccountMutation());

queryStore.register(EndpointName.CREATE_WEBHOOKS, useCreateWebhooksMutation());
queryStore.register(EndpointName.DELETE_WEBHOOKS, useDeleteWebhooksMutation());
queryStore.register(EndpointName.FETCH_WEBHOOKS, useFetchWebhooksQuery());

queryStore.register(EndpointName.UPDATE_PLUGIN_SETTINGS, useUpdatePluginSettingsMutation());
</script>
