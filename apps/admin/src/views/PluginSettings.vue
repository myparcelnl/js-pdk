<template>
  <PdkPluginSettingsWrapper v-test>
    <AccountSettings />

    <PluginSettingsForms v-if="hasAccount" />
  </PdkPluginSettingsWrapper>
</template>

<script lang="ts" setup>
/**
 * Plugin settings screen.
 */
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {AdminContextKey, BackendEndpoint} from '@myparcel-pdk/common';
import {useQueryStore} from '../stores/useQueryStore';
import {useActionStore} from '../stores/useActionStore';
import {useStoreContextQuery} from '../composables/useStoreContextQuery';
import PluginSettingsForms from '../components/PluginSettings/PluginSettingsForms.vue';
import AccountSettings from '../components/PluginSettings/AccountSettings.vue';
import {pluginSettingsUpdateAction} from '../actions/definitions/settings';
import {fetchDynamicContextAction, fetchPluginSettingsViewContextAction} from '../actions/definitions/context';
import {useUpdatePluginSettingsMutation} from '../actions/composables/mutations/settings/useUpdatePluginSettingsMutation';
import {useUpdateAccountMutation} from '../actions/composables/mutations/account/useUpdateAccountMutation';
import {useDeleteAccountMutation} from '../actions/composables/mutations/account/useDeleteAccountMutation';

const queryStore = useQueryStore();

queryStore.registerContextQueries(AdminContextKey.PluginSettingsView);

queryStore.register(BackendEndpoint.DeleteAccount, useDeleteAccountMutation());
queryStore.register(BackendEndpoint.UpdateAccount, useUpdateAccountMutation());
queryStore.register(BackendEndpoint.UpdatePluginSettings, useUpdatePluginSettingsMutation());

const actionStore = useActionStore();

actionStore.register([pluginSettingsUpdateAction, fetchPluginSettingsViewContextAction, fetchDynamicContextAction]);

const dynamicContextQuery = useStoreContextQuery();

const hasAccount = computed(() => Boolean(get(dynamicContextQuery.data)?.account));
</script>
