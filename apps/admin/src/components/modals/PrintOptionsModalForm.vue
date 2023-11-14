<template>
  <MagicForm
    v-if="form"
    v-test="$.type.__name"
    :form="form" />
</template>

<script lang="ts" setup>
import {markRaw, onMounted, ref} from 'vue';
import {defineForm, MagicForm} from '@myparcel/vue-form-builder';
import {AdminModalKey} from '../../types';
import {generateFormFields} from '../../forms';
import {useAdminConfig, useContext, usePluginSettings} from '../../composables';

const context = useContext();
const pluginSettings = usePluginSettings();
const config = useAdminConfig();

const form = ref();

onMounted(() => {
  form.value = markRaw(
    defineForm(AdminModalKey.PrintOptions, {
      ...config.formConfigOverrides?.modal,
      ...config.formConfigOverrides?.[AdminModalKey.PrintOptions],
      fields: generateFormFields({
        fields: context.printOptionsView.elements,
        values: pluginSettings.label,
      }),
    }),
  );
});
</script>
