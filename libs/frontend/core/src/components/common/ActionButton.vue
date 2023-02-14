<template>
  <PdkButton
    v-test="`actionButton--${action?.id}`"
    :size="size"
    :disabled="disabled || action?.disabled"
    :icon="action?.icon"
    :label="!hideText ? action?.label : null"
    :title="hideText ? action?.label : null"
    :aria-label="hideText ? action?.label : null"
    @click="onClick" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {Size} from '@myparcel-pdk/common/src';
import {ResolvedAction} from '../../types';

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
      type: String as PropType<Size>,
      default: Size.MEDIUM,
    },
  },

  emits: ['click'],

  setup: (props, ctx) => {
    return {
      async onClick() {
        ctx.emit('click');
        await props.action?.onClick();
      },
    };
  },
});
</script>
