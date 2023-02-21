<template>
  <div class="btn-group">
    <ActionButton
      v-for="action in dropdownActions.standalone"
      :key="`dropdown_${action.id}`"
      :action="action"
      class="btn-sm" />

    <PdkButton
      :aria-label="translate('toggle_dropdown')"
      :disabled="disabled"
      aria-expanded="false"
      aria-haspopup="true"
      class="btn-sm dropdown-toggle dropdown-toggle-split"
      data-toggle="dropdown" />

    <div class="dropdown-menu">
      <BaseButton
        v-for="(action, index) in dropdownActions.hidden"
        :key="`${index}_${action.label}`"
        :disabled="action.disabled"
        :icon="action.icon"
        :label="action.label"
        class="dropdown-item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ActionButton, ResolvedAction, useDropdownData, useLanguage} from '@myparcel-pdk/frontend-core/src';
import BaseButton from './common/BaseButton.vue';

const props = defineProps<{
  disabled?: boolean;
  actions: ResolvedAction[];
}>();

defineEmits<(event: 'click') => void>();

const {translate} = useLanguage();

const {dropdownActions} = useDropdownData(props.actions);
</script>
