<template>
  <div>
    <h3>Download logs</h3>

    <ActionButton
      v-for="action in actions"
      :key="action.name"
      :action="action" />
  </div>
</template>

<script setup lang="ts">
import {ActionButton} from '../common';
import {instantiateActions} from '../../services';
import {debugDownloadLogsAction, debugSendLogsAction} from '../../actions';

const actions = instantiateActions([debugDownloadLogsAction, debugSendLogsAction]);
</script>
