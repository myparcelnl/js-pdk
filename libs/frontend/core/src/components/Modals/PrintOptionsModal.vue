<template>
  <PdkModal
    id="pdk-modal-printOptions"
    title="print_options_title">
    <MagicForm :form="printOptionsForm" />
  </PdkModal>
</template>

<script lang="ts">
import {MagicForm, defineForm} from '@myparcel/vue-form-builder';
import {defineComponent, ref, resolveComponent} from 'vue';
import {formatOptions, outputOptions, positionOptions} from '../../data';
import {ModalKey} from '../../types';
import {usePluginSettings} from '../../composables';

/**
 * Modal with print options. Opened when any print action is executed, if the modal is enabled in the module settings.
 */
export default defineComponent({
  name: 'PrintOptionsModal',

  components: {MagicForm},

  // eslint-disable-next-line max-lines-per-function
  setup: () => {
    const pluginSettings = usePluginSettings();

    return {
      printOptionsForm: defineForm(ModalKey.PRINT_OPTIONS, {
        fields: [
          {
            name: 'format',
            ref: ref(pluginSettings.label.format),
            component: resolveComponent('PdkSelectInput'),
            options: formatOptions,
          },
          {
            name: 'output',
            ref: ref(pluginSettings.label.output),
            component: resolveComponent('PdkSelectInput'),
            options: outputOptions,
          },
          {
            name: 'position',
            ref: ref(pluginSettings.label.position),
            component: resolveComponent('PdkMultiCheckbox'),
            options: positionOptions,
          },
        ],
      }),
    };
  },
});
</script>
