<template>
  <div
    v-test="AdminComponent.DropdownButton"
    class="flex">
    <ActionButton
      v-for="(action, index) in dropdownActions.standalone"
      :key="action.id"
      v-test="[AdminComponent.DropdownButton, 'standalone']"
      :action="action"
      :class="{
        'rounded-r-none': index === dropdownActions.standalone.length - 1,
      }"
      :disabled="disabled"
      :hide-text="hideText"
      :size="size" />

    <PdkButton
      v-if="dropdownActions.hidden.length > 0"
      v-test="[AdminComponent.DropdownButton, 'button']"
      :aria-expanded="toggled"
      :aria-label="translate('toggle_dropdown')"
      :class="{
        'rounded-l-none border-l-0': dropdownActions.standalone.length > 0,
      }"
      :disabled="disabled"
      :icon="dropdownIcon"
      :size="size"
      aria-haspopup="true"
      class="relative"
      @focus="toggled = true"
      @focusout="toggled = false"
      @mouseout="toggled = false"
      @mouseover="toggled = true">
      <slot />

      <div
        v-show="toggled"
        class="absolute bg-white border border-solid dark:bg-gray-900 flex flex-col right-0 rounded top-full z-50">
        <ActionButton
          v-for="(action, index) in dropdownActions.hidden"
          :key="`${index}_${action.id}`"
          v-test="[AdminComponent.DropdownButton, 'item']"
          :action="action"
          :disabled="disabled"
          :icon="action.icon"
          class="!rounded-none bg-transparent border-none text-left">
          {{ translate(action.label) }}
        </ActionButton>
      </div>
    </PdkButton>
  </div>
</template>

<script lang="ts" setup>
import {
  ActionButton,
  AdminComponent,
  type DropdownButtonProps,
  useDropdownButtonContext,
  useLanguage,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<DropdownButtonProps>();

const {toggled, dropdownActions, dropdownIcon} = useDropdownButtonContext(props);

const {translate} = useLanguage();
</script>
