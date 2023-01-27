<template>
  <PdkButton
    :disabled="disabled || action?.disabled"
    :icon="action?.icon"
    :label="!hideText ? action?.label : null"
    :title="hideText ? action?.label : null"
    :aria-label="hideText ? action?.label : null"
    @click="action?.onClick" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {ResolvedAction} from '../../types';
import {PdkButtonSize} from '@myparcel-pdk/common';

export default defineComponent({
  name: 'ActionButton',

  props: {
    action: {
      type: Object as PropType<ResolvedAction>,
      required: true,
    },

    disabled: {
      type: Boolean,
    },

    hideText: {
      type: Boolean,
    },

    size: {
      type: String as PropType<PdkButtonSize>,
      default: PdkButtonSize.MEDIUM,
    },
  },
});
</script>
