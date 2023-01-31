<template>
  <PdkPluginSettingsWrapper v-test>
    <AccountConnectForm />

    <PluginSettingsForms />
  </PdkPluginSettingsWrapper>
</template>

<script setup lang="ts">
/**
 * Plugin settings screen.
 */
import {useFetchAccountQuery, useUpdateAccountMutation, useUpdatePluginSettingsMutation} from '../actions';
import AccountConnectForm from '../components/PluginSettings/AccountConnectForm.vue';
import {EndpointName} from '@myparcel-pdk/common';
import {defineAsyncComponent} from 'vue';
import {useQueryStore} from '../stores';

// eslint-disable-next-line @typescript-eslint/naming-convention
const PluginSettingsForms = defineAsyncComponent(() => import('../components/PluginSettings/PluginSettingsForms.vue'));

const queryStore = useQueryStore();

queryStore.register(EndpointName.FETCH_ACCOUNT, useFetchAccountQuery());
queryStore.register(EndpointName.UPDATE_ACCOUNT, useUpdateAccountMutation());
queryStore.register(EndpointName.UPDATE_PLUGIN_SETTINGS, useUpdatePluginSettingsMutation());
</script>
