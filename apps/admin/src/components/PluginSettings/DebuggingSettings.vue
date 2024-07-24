<template>
  <div>
    <h3>Download logs</h3>

    <ActionButton :action="action" />
  </div>
</template>

<script setup lang="ts">
import {ActionButton} from '../common';
import {instantiateAction} from '../../services';
import {debugDownloadLogsAction} from '../../actions';

const action = instantiateAction(debugDownloadLogsAction);
</script>
