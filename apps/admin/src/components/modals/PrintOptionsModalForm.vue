<template>
  <MagicForm
    v-if="form"
    v-test="$.type.__name"
    :form="form" />
</template>

<script lang="ts" setup>
import {markRaw, onMounted, ref} from 'vue';
import {defineForm, MagicForm} from '@myparcel/vue-form-builder';
import {generateFormFields} from '../../forms/pluginSettings/generateFormFields';
import {useContext} from '../../composables/context/useContext';
import {usePluginSettings} from '../../composables/context/usePluginSettings';
import {useAdminConfig} from '../../composables/useAdminConfig';
import {AdminModalKey} from '../../data/constants';

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
