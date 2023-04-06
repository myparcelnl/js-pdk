<template>
  <ActionButton
    v-for="action in dropdownActions.standalone"
    :key="action.id"
    :disabled="disabled"
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
      :disabled="disabled"
      :size="size"
      :action="action" />
  </div>
</template>

<script lang="ts" setup>
/**
 * This component is used to render a dropdown button. The dropdown button is a
 * button that can be clicked to open a dropdown menu. The dropdown menu can
 * contain multiple items.
 */

import {ActionButton, ActionDefinition, useDropdownData, useLanguage} from '@myparcel-pdk/frontend-admin-core/src';
import {PropType} from 'vue';
import {Size} from '@myparcel-pdk/common/src';

const props = defineProps({
  /**
   * List of actions.
   */
  actions: {
    type: Array as PropType<ActionDefinition[]>,
    default: () => [],
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
    default: Size.Small,
  },
});

defineEmits(['click']);

const {translate} = useLanguage();

const {dropdownActions, toggled} = useDropdownData(props.actions);
</script>
