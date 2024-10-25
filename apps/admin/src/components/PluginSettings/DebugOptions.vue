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
import {useActionStore} from '../../stores/useActionStore';
import {useQueryStore} from '../../stores/useQueryStore';
import {instantiateAction} from '../../services/instantiateAction';
import {useLanguage} from '../../composables/language/useLanguage';
import {useDownloadLogsMutation} from '../../actions/composables/mutations/debug/useDownloadLogsMutation';
import {downloadLogsAction} from '../../actions/definitions/debug';
import {refreshAccountAction, updateAccountAction} from '../../actions/definitions/account';

const {translate} = useLanguage();

const queryStore = useQueryStore();
const actionStore = useActionStore();

queryStore.register(BackendEndpoint.DownloadLogs, useDownloadLogsMutation());
actionStore.register([updateAccountAction, downloadLogsAction]);

const refreshAccountInstance = instantiateAction(refreshAccountAction);
const downloadLogsInstance = instantiateAction(downloadLogsAction);
</script>
