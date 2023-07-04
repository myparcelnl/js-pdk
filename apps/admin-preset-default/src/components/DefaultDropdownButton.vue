<template>
  <div v-test="AdminComponent.DropdownButton">
    <ActionButton
      v-for="action in dropdownActions.standalone"
      :key="action.id"
      :action="action"
      :disabled="disabled"
      :hide-text="hideText"
      :size="size" />

    <PdkButton
      :aria-expanded="toggled"
      :aria-label="translate('toggle_dropdown')"
      :disabled="disabled"
      :icon="dropdownIcon"
      :size="size"
      aria-haspopup="true"
      @focus="toggled = true"
      @focusout="toggled = false"
      @mouseout="toggled = false"
      @mouseover="toggled = true">
      <slot />
    </PdkButton>

    <div v-show="toggled">
      <ActionButton
        v-for="(action, index) in dropdownActions.hidden"
        :key="`${index}_${action.id}`"
        :action="action"
        :disabled="disabled"
        :icon="action.icon"
        :size="size" />
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * This component is used to render a dropdown button. The dropdown button is a
 * button that can be clicked to open a dropdown menu. The dropdown menu can
 * contain multiple items.
 */

import {
  ActionButton,
  type ActionDefinition,
  AdminComponent,
  type Size,
  useDropdownData,
  useLanguage,
} from '@myparcel-pdk/admin';

const props = defineProps<{
  /**
   * List of actions.
   */
  // eslint-disable-next-line vue/no-unused-properties
  actions: ActionDefinition[];

  /**
   * Controls disabled state.
   */
  disabled?: boolean;

  /**
   * To hide the text of the standalone actions.
   */
  hideText?: boolean;

  /**
   * Size of the button.
   */
  size?: Size;
}>();

const {toggled, dropdownActions, dropdownIcon} = useDropdownData(props);

const {translate} = useLanguage();
</script>
