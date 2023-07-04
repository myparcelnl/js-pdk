<template>
  <div class="btn-group">
    <ActionButton
      v-for="action in dropdownActions.standalone"
      :key="`dropdown_${action.id}`"
      :action="action"
      :disabled="disabled"
      :hide-text="hideText"
      class="btn-sm" />

    <PdkButton
      :aria-label="translate('toggle_dropdown')"
      :disabled="disabled"
      :icon="dropdownIcon"
      :size="size"
      aria-expanded="false"
      aria-haspopup="true"
      class="btn-sm dropdown-toggle dropdown-toggle-split"
      data-toggle="dropdown">
      <slot />
    </PdkButton>

    <div class="dropdown-menu">
      <BaseButton
        v-for="(action, index) in dropdownActions.hidden"
        :key="`${index}_${action.label}`"
        :disabled="disabled"
        :icon="action.icon"
        :label="action.label"
        class="dropdown-item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ActionButton, type ActionDefinition, type Size, useDropdownData, useLanguage} from '@myparcel-pdk/admin';
import BaseButton from './common/BaseButton.vue';

const props = defineProps<{
  // eslint-disable-next-line vue/no-unused-properties
  actions: ActionDefinition[];
  disabled?: boolean;
  hideText?: boolean;
  size?: Size;
}>();

const {dropdownActions, dropdownIcon} = useDropdownData(props);

const {translate} = useLanguage();
</script>
