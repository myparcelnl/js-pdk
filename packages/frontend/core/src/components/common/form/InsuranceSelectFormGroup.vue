<template>
  <SelectFormGroup
    v-model="model"
    :disabled="disabled"
    :options="options"
    label="shipment_options_insurance" />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import SelectFormGroup from './SelectFormGroup.vue';
import {useTranslate} from '../../../composables';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'InsuranceSelectFormGroup',
  components: {SelectFormGroup},

  props: {
    disabled: {
      type: Boolean,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: Number,
      default: 0,
    },
  },

  setup: (props, ctx) => {
    const translate = useTranslate();
    const model = useVModel(props, 'modelValue', ctx.emit);
    // const contextData = useGlobalContext(ContextKey.ORDER_DATA, props.context as ShipmentOptionsContext);

    const options = computed(() => {
      return [
        {
          label: translate('none'),
          value: 0,
        },
        // ...contextData.value.consignment.insuranceOptions.map((amount) => {
        //   const formattedCurrency = formatCurrency(amount);
        //
        //   return {
        //     label: `${translate('up_to')} ${formattedCurrency}`,
        //     value: amount,
        //   };
        // }),
      ];
    });

    return {
      model,
      options,
    };
  },
});
</script>
