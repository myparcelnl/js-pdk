<template>
  <MagicForm :form="form" />
</template>

<script setup lang="ts">
import {MagicForm, defineForm} from '@myparcel/vue-form-builder/src';
import {formatOptions, outputOptions, positionOptions} from '../../data';
import {ref, resolveComponent} from 'vue';
import {ModalKey} from '../../types';
import {defineFormField} from '../../forms';
import {usePluginSettings} from '../../composables';

const pluginSettings = usePluginSettings();

// noinspection JSUnusedGlobalSymbols
const form = defineForm(ModalKey.PRINT_OPTIONS, {
  fields: [
    defineFormField({
      name: 'output',
      label: 'settings_label_output',
      ref: ref(pluginSettings.label.output),
      component: resolveComponent('PdkSelectInput'),
      props: {
        options: outputOptions,
      },
    }),

    defineFormField({
      name: 'format',
      label: 'settings_label_format',
      ref: ref(pluginSettings.label.format),
      component: resolveComponent('PdkSelectInput'),
      props: {
        options: formatOptions,
      },
    }),

    defineFormField({
      name: 'position',
      label: 'settings_label_position',
      ref: ref(pluginSettings.label.position),
      component: resolveComponent('PdkMultiCheckbox'),
      props: {
        options: positionOptions,
      },
      visibleWhen: ({form}) => form.model.format.ref.value === 'A4',
    }),
  ],
});
</script>
