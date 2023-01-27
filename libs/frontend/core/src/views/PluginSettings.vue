<template>
  <PdkPluginSettingsWrapper>
    <TabNavigation :tabs="tabs" />
  </PdkPluginSettingsWrapper>
</template>

<script setup lang="ts">
/**
 * Plugin settings screen.
 */
import {EndpointName} from '@myparcel-pdk/common';
import {TabNavigation} from '../components/common';
import {useQueryStore} from '../stores';
import {useUpdatePluginSettingsMutation} from '../actions';
import {createPluginSettingsTabs} from '../forms';

const queryStore = useQueryStore();

queryStore.register(EndpointName.UPDATE_PLUGIN_SETTINGS, useUpdatePluginSettingsMutation());

const tabs = createPluginSettingsTabs();
</script>
