<template>
  <SelectFormGroup
    v-model="model"
    :disabled="disabled"
    :options="options"
    label="shipment_options_package_format" />
</template>

<script lang="ts">
import SelectFormGroup from './SelectFormGroup.vue';
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'PackageFormatSelectFormGroup',
  components: {SelectFormGroup},

  props: {
    disabled: {
      type: Boolean,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: String,
      default: null,
    },
  },

  setup: (props, ctx) => {
    const model = useVModel(props, 'modelValue', ctx.emit);
    // const contextData = useGlobalContext(ContextKey.ORDER_DATA);

    return {
      model,
      options: [], // contextData.value.options.packageFormat,
    };
  },
});
</script>
