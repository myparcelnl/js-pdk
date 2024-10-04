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
  </div>
</template>

<script lang="ts" setup>
import {BackendEndpoint} from '@myparcel-pdk/common';
import {ActionButton} from '../common';
import {useActionStore, useQueryStore} from '../../stores';
import {instantiateAction} from '../../services';
import {useLanguage} from '../../composables';
import {downloadLogsAction, refreshAccountAction, updateAccountAction, useDownloadLogsMutation} from '../../actions';

const {translate} = useLanguage();

const queryStore = useQueryStore();
const actionStore = useActionStore();

queryStore.register(BackendEndpoint.DownloadLogs, useDownloadLogsMutation());
actionStore.register([updateAccountAction, downloadLogsAction]);

const refreshAccountInstance = instantiateAction(refreshAccountAction);
const downloadLogsInstance = instantiateAction(downloadLogsAction);
</script>
