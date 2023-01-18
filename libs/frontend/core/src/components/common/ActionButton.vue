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
import {FrontendAction} from '../../actions';
import {PdkButtonAction} from '../../types';
import {useAction} from '../../services';

export default defineComponent({
  name: 'ActionButton',

  props: {
    action: {
      type: [String, Object] as PropType<PdkButtonAction | FrontendAction>,
      default: null,
    },

    disabled: {
      type: Boolean,
    },

    hideText: {
      type: Boolean,
    },
  },

  setup: (props) => {
    return {
      resolvedAction: useAction(props.action),
    };
  },
});
</script>
