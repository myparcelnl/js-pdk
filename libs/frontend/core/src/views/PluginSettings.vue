<template>
  <PdkPluginSettingsWrapper>
    <template
      v-for="form in forms"
      :key="`plugin_settings_${form.name}`">
      <h1>{{ form.name }}</h1>
      <MagicForm :form="form" />
    </template>
  </PdkPluginSettingsWrapper>
</template>

<script setup lang="ts">
/**
 * Plugin settings screen.
 */
import {MagicForm} from '@myparcel/vue-form-builder';
import {createPluginSettingsForms} from '../forms';

const forms = createPluginSettingsForms();
</script>
