<template>
  <PdkButton
    :disabled="resolvedAction.disabled"
    :icon="resolvedAction.icon"
    :label="resolvedAction.label"
    @click="resolvedAction.onClick" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {FrontendAction} from '../../data';
import {PdkButtonAction} from '../../types';
import {useAction} from '../../services';

export default defineComponent({
  name: 'ActionButton',

  props: {
    action: {
      type: [String, Object] as PropType<PdkButtonAction | FrontendAction>,
      default: null,
    },
  },

  setup: (props) => {
    return {
      resolvedAction: useAction(props.action),
    };
  },
});
</script>
