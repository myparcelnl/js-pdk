<template>
  <ActionButton
    v-for="action in standaloneActions"
    :key="action.id"
    :hide-text="hideText"
    :action="action" />

  <PdkButton
    :aria-expanded="toggled"
    :disabled="disabled"
    aria-haspopup="true"
    :aria-label="translate('toggle_dropdown')"
    @focus="toggled = true"
    @focusout="toggled = false"
    @mouseout="toggled = false"
    @mouseover="toggled = true">
  </PdkButton>

  <div v-show="toggled">
    <ActionButton
      v-for="(action, index) in dropdownActions"
      :key="`${index}_${action.id}`"
      :action="action" />
  </div>
</template>

<script lang="ts">
import {ActionButton, PdkDropdownAction, useLanguage} from '@myparcel/pdk-frontend';
import {PropType, computed, defineComponent, ref} from 'vue';

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
      type: Array as PropType<PdkDropdownAction[]>,
      default: (): never[] => [],
    },
  },

  emits: ['click'],

  setup: (props) => {
    const toggled = ref(false);
    const {translate} = useLanguage();

    return {
      translate,
      toggle: () => {
        toggled.value = !toggled.value;
      },

      toggled,

      standaloneActions: computed(() => props.actions.filter((option) => option.standalone)),
      dropdownActions: computed(() => props.actions.filter((option) => !option.standalone)),
    };
  },
});
</script>
