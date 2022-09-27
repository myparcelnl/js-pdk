<template>
  <SelectFormGroup
    v-model="model"
    :disabled="disabled"
    :options="options">
    {{ translate('extra_options_digital_stamp_weight') }}
    <p
      class="form-text"
      v-text="weightString" />
  </SelectFormGroup>
</template>

<script lang="ts">
import SelectFormGroup from './SelectFormGroup.vue';
import {defineComponent} from 'vue';
import {useTranslate} from '../../../composables';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'DigitalStampWeightSelectFormGroup',
  components: {SelectFormGroup},

  props: {
    disabled: {
      type: Boolean,
    },

    calculatedWeight: {
      type: Number,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: String,
      default: null,
    },
  },

  setup: (props, ctx) => {
    const translate = useTranslate();
    const model = useVModel(props, 'modelValue', ctx.emit);

    return {
      model,
      translate,
      options: [],
      weightString: `${translate('order_calculated_weight')} ${props.calculatedWeight}g`,
    };
  },
});
</script>
