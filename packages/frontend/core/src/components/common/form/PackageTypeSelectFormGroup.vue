<template>
  <SelectFormGroup
    v-model="model"
    :disabled="disabled"
    :options="options"
    label="shipment_package_type" />
</template>

<script lang="ts">
import {PACKAGE_TYPES} from '@myparcel/sdk';
import SelectFormGroup from './SelectFormGroup.vue';
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'PackageTypeSelectFormGroup',
  components: {SelectFormGroup},
  props: {
    disabled: {
      type: Boolean,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: String,
      default: PACKAGE_TYPES.PACKAGE_NAME,
    },
  },

  setup: (props, ctx) => {
    const model = useVModel(props, 'modelValue', ctx.emit);
    // const contextData = useGlobalContext(ContextKey.ORDER_DATA);

    // model.value ??= contextData.value.options.packageType[0].value;

    return {
      model,
      options: [], // contextData.value.options.packageType,
    };
  },
});
</script>
