<template>
  <PdkPluginSettingsWrapper v-test>
    <TabNavigation :tabs="tabs" />
  </PdkPluginSettingsWrapper>
</template>

<script setup lang="ts">
/**
 * Plugin settings screen.
 */
import {EndpointName} from '@myparcel-pdk/common';
import {TabNavigation} from '../components/common';
import {createPluginSettingsTabs} from '../forms';
import {useQueryStore} from '../stores';
import {useUpdatePluginSettingsMutation} from '../actions';

const queryStore = useQueryStore();

queryStore.register(EndpointName.UPDATE_PLUGIN_SETTINGS, useUpdatePluginSettingsMutation());

const tabs = createPluginSettingsTabs();
</script>
