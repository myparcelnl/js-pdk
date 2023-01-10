<template>
  <PdkPluginSettingsWrapper>
    <TabNavigation :tabs="tabs" />
  </PdkPluginSettingsWrapper>
</template>

<script setup lang="ts">
/**
 * Plugin settings screen.
 */
import {MagicForm} from '@myparcel/vue-form-builder';
import {TabNavigation} from '../components/common';
import {createPluginSettingsForms} from '../forms';
import {h} from 'vue';

const forms = createPluginSettingsForms();

const tabs = forms.map((form) => ({
  name: form.name,
  component: h('div', [h('PdkHeading', {level: 1}, form.name), h(MagicForm, {form})]),
}));
</script>
