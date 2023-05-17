<template>
  <MagicForm :form="form" />
</template>

<script lang="ts" setup>
import {MagicForm, defineForm} from '@myparcel/vue-form-builder/src';
import {useAdminConfig, useContext, usePluginSettings} from '../../composables';
import {AdminModalKey} from '../../types';
import {generateFormFields} from '../../forms';

const context = useContext();
const pluginSettings = usePluginSettings();
const config = useAdminConfig();

const form = defineForm(AdminModalKey.PrintOptions, {
  ...config.formConfigOverrides?.modal,
  ...config.formConfigOverrides?.[AdminModalKey.PrintOptions],
  fields: generateFormFields({
    fields: context.printOptionsView.elements,
    values: pluginSettings.label,
  }),
});
</script>
