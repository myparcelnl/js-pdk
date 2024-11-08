<template>
  <div v-test="AdminComponent.DropdownButton">
    <ActionButton
      v-for="action in dropdownActions.standalone"
      :key="action.id"
      v-test="[AdminComponent.DropdownButton, 'standalone']"
      :action="action"
      :disabled="disabled"
      :hide-text="hideText"
      :size="size" />

    <PdkButton
      v-test="[AdminComponent.DropdownButton, 'button']"
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
        v-test="[AdminComponent.DropdownButton, 'item']"
        :action="action"
        :disabled="disabled"
        :icon="action.icon"
        :size="size" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ActionButton,
  AdminComponent,
  type DropdownButtonProps,
  type DropdownButtonSlots,
  useDropdownButtonContext,
  useLanguage,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<DropdownButtonProps>();

defineSlots<DropdownButtonSlots>();

const {toggled, dropdownActions, dropdownIcon} = useDropdownButtonContext(props);

const {translate} = useLanguage();
</script>
