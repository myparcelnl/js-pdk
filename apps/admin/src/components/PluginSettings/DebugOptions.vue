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

    <div>
      <p v-text="translate('debug_switch_to_acceptance_api_description')" />

      <ActionButton :action="switchToAcceptanceApiInstance" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {BackendEndpoint} from '@myparcel-pdk/common';
import {ActionButton} from '../common';
import {useActionStore, useQueryStore} from '../../stores';
import {instantiateAction} from '../../services';
import {useLanguage} from '../../composables';
import {downloadLogsAction, refreshAccountAction, switchToAcceptanceApiAction, updateAccountAction, useDownloadLogsMutation, useSwitchToAcceptanceApiMutation} from '../../actions';

const {translate} = useLanguage();

const queryStore = useQueryStore();
const actionStore = useActionStore();

queryStore.register(BackendEndpoint.DownloadLogs, useDownloadLogsMutation());
queryStore.register(BackendEndpoint.SwitchToAcceptanceApi, useSwitchToAcceptanceApiMutation());
actionStore.register([updateAccountAction, downloadLogsAction, switchToAcceptanceApiAction, refreshAccountAction]);

const refreshAccountInstance = instantiateAction(refreshAccountAction);
const downloadLogsInstance = instantiateAction(downloadLogsAction);
const switchToAcceptanceApiInstance = instantiateAction(switchToAcceptanceApiAction);
</script>
