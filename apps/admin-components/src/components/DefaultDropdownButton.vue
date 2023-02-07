<template>
  <ActionButton
    v-for="action in dropdownActions.standalone"
    :key="action.id"
    :action="action"
    :hide-text="hideText" />

  <PdkButton
    :aria-expanded="toggled"
    :aria-label="translate('toggle_dropdown')"
    :disabled="disabled"
    aria-haspopup="true"
    @focus="toggled = true"
    @focusout="toggled = false"
    @mouseout="toggled = false"
    @mouseover="toggled = true" />

  <div v-show="toggled">
    <ActionButton
      v-for="(action, index) in dropdownActions.hidden"
      :key="`${index}_${action.id}`"
      :action="action" />
  </div>
</template>

<script lang="ts">
import {ActionButton, ResolvedAction, useDropdownData, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';

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
     * List of actions.
     */
    actions: {
      type: Array as PropType<ResolvedAction[]>,
      default: (): never[] => [],
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
