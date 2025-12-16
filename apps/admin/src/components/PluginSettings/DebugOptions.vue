<template>
  <div>
    <PdkHeading level="2">{{ translate('settings_debug_title') }}</PdkHeading>

    <div>
      <p v-text="translate('debug_refresh_description')" />

      <ActionButton :action="refreshAccountInstance" />
    </div>

    <div>
      <p v-text="translate('debug_download_logs_description')" />

      <ActionButton :action="downloadLogsInstance" />
    </div>

    <div class="debug-hidden">
      <p v-text="switchButtonDescription" />

      <ActionButton
        v-if="isConnectedToAcceptance"
        :action="switchToProductionApiInstance" />
      <ActionButton
        v-else
        :action="switchToAcceptanceApiInstance" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, toValue} from 'vue';
import {BackendEndpoint} from '@myparcel-dev/pdk-common';
import {ActionButton} from '../common';
import {useActionStore, useQueryStore} from '../../stores';
import {instantiateAction} from '../../services';
import {useLanguage, useStoreContextQuery} from '../../composables';
import {
  downloadLogsAction,
  refreshAccountAction,
  switchToAcceptanceApiAction,
  switchToProductionApiAction,
  updateAccountAction,
  useDownloadLogsMutation,
  useSwitchToAcceptanceApiMutation,
  useSwitchToProductionApiMutation,
} from '../../actions';

const {translate} = useLanguage();

const queryStore = useQueryStore();
const actionStore = useActionStore();
const contextQuery = useStoreContextQuery();

queryStore.register(BackendEndpoint.DownloadLogs, useDownloadLogsMutation());
queryStore.register(BackendEndpoint.SwitchToAcceptanceApi, useSwitchToAcceptanceApiMutation());
queryStore.register(BackendEndpoint.SwitchToProductionApi, useSwitchToProductionApiMutation());
actionStore.register([
  updateAccountAction,
  downloadLogsAction,
  switchToAcceptanceApiAction,
  switchToProductionApiAction,
  refreshAccountAction,
]);

const refreshAccountInstance = instantiateAction(refreshAccountAction);
const downloadLogsInstance = instantiateAction(downloadLogsAction);
const switchToAcceptanceApiInstance = instantiateAction(switchToAcceptanceApiAction);
const switchToProductionApiInstance = instantiateAction(switchToProductionApiAction);

// Determine if connected to acceptance API based on environment setting
const isConnectedToAcceptance = computed(() => {
  const context = toValue(contextQuery.data);
  const environment = context?.pluginSettings?.account?.environment;
  return environment === 'acceptance';
});

// Dynamic button description based on current environment
const switchButtonDescription = computed(() => {
  return isConnectedToAcceptance.value
    ? translate('debug_switch_to_production_api_description')
    : translate('debug_switch_to_acceptance_api_description');
});
</script>

<style scoped>
.debug-hidden {
  display: none;
}
</style>
