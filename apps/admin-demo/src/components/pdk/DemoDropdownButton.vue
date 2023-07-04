<template>
  <div
    v-test="AdminComponent.DropdownButton"
    class="flex">
    <ActionButton
      v-for="(action, index) in dropdownActions.standalone"
      :key="action.id"
      :action="action"
      :class="{
        'rounded-r-none': index === dropdownActions.standalone.length - 1,
      }"
      :hide-text="hideText"
      :size="size" />

    <PdkButton
      v-if="dropdownActions.hidden.length > 0"
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
  type ActionDefinition,
  AdminComponent,
  type Size,
  useDropdownData,
  useLanguage,
} from '@myparcel-pdk/admin';

const props = defineProps<{
  // eslint-disable-next-line vue/no-unused-properties
  actions: ActionDefinition[];
  disabled?: boolean;
  hideText?: boolean;
  size?: Size;
}>();

const {toggled, dropdownActions, dropdownIcon} = useDropdownData(props);

const {translate} = useLanguage();
</script>
