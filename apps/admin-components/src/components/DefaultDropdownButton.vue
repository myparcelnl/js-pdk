<template>
  <ActionButton
    v-for="action in dropdownActions.standalone"
    :key="action.id"
    :action="action"
    :size="size"
    :hide-text="hideText" />

  <PdkButton
    :aria-expanded="toggled"
    :aria-label="translate('toggle_dropdown')"
    :disabled="disabled"
    aria-haspopup="true"
    :size="size"
    @focus="toggled = true"
    @focusout="toggled = false"
    @mouseout="toggled = false"
    @mouseover="toggled = true" />

  <div v-show="toggled">
    <ActionButton
      v-for="(action, index) in dropdownActions.hidden"
      :key="`${index}_${action.id}`"
      :size="size"
      :action="action" />
  </div>
</template>

<script lang="ts">
import {ActionButton, ResolvedAction, useDropdownData, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';
import {Size} from '@myparcel-pdk/common';

/**
 * This component is used to render a dropdown button. The dropdown button is a
 * button that can be clicked to open a dropdown menu. The dropdown menu can
 * contain multiple items.
 */
export default defineComponent({
  name: 'DefaultDropdownButton',

  components: {
    ActionButton: ActionButton,
  },

  props: {
    /**
     * List of actions.
     */
    actions: {
      type: Array as PropType<ResolvedAction[]>,
      default: (): never[] => [],
    },

    /**
     * Controls disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * To hide the text of the standalone actions.
     */
    hideText: {
      type: Boolean,
    },

    /**
     * Size of the button.
     */
    size: {
      type: String as PropType<Size>,
      default: Size.SMALL,
    },
  },

  emits: ['click'],

  setup: (props) => {
    const {translate} = useLanguage();

    return {
      translate,
      ...useDropdownData(props.actions),
    };
  },
});
</script>
