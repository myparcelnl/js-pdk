<template>
  <PdkButton
    :disabled="disabled || resolvedAction?.disabled"
    :icon="resolvedAction?.icon"
    :label="!hideText ? resolvedAction?.label : null"
    :title="hideText ? resolvedAction?.label : null"
    :aria-label="hideText ? resolvedAction?.label : null"
    @click="resolvedAction?.onClick" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {PdkAction} from '../../types';
import {PdkButtonSize} from '@myparcel-pdk/common';
import {createAction} from '../../services';

export default defineComponent({
  name: 'ActionButton',

  props: {
    action: {
      type: Object as PropType<PdkAction>,
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

  setup: (props) => {
    return {
      resolvedAction: createAction(props.action),
    };
  },
});
</script>
