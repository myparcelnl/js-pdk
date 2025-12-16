<template>
  <PdkButtonGroup v-test="AdminComponent.DropdownButton">
    <ActionButton
      v-for="action in dropdownActions.standalone"
      :key="`dropdown_${action.id}`"
      v-test="[AdminComponent.DropdownButton, 'standalone']"
      :action="action"
      :class="adminConfig.cssUtilities?.whitespaceNoWrap"
      :disabled="disabled"
      :hide-text="hideText"
      :size="size" />

    <PdkButton
      v-if="dropdownActions.hidden.length > 0"
      ref="dropdown"
      v-test="[AdminComponent.DropdownButton, 'button']"
      :aria-label="translate('toggle_dropdown')"
      :class="{
        'p-0': dropdownActions.standalone.length === 0,
      }"
      :disabled="disabled"
      :size="size"
      aria-haspopup="true"
      class="dropdown-toggle dropdown-toggle-split"
      data-toggle="dropdown">
      <slot />

      <div class="dropdown-menu">
        <ActionButton
          v-for="(action, index) in dropdownActions.hidden"
          :key="`${index}_${action.id}`"
          v-test="[AdminComponent.DropdownButton, 'item']"
          :action="action"
          :component="BaseButton"
          :disabled="disabled"
          :icon="action.icon"
          :size="size"
          class="dropdown-item">
          {{ translate(action.label) }}
        </ActionButton>
      </div>
    </PdkButton>
  </PdkButtonGroup>
</template>

<script lang="ts" setup>
import {type ComponentPublicInstance, onMounted, ref} from 'vue';
import {
  ActionButton,
  AdminComponent,
  type DropdownButtonProps,
  type DropdownButtonSlots,
  useAdminConfig,
  useDropdownButtonContext,
  useLanguage,
} from '@myparcel-dev/pdk-admin';
import BaseButton from './common/BaseButton.vue';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<DropdownButtonProps>();

defineSlots<DropdownButtonSlots>();

const {dropdownActions} = useDropdownButtonContext(props);

const {translate} = useLanguage();

const adminConfig = useAdminConfig();

const dropdown = ref<ComponentPublicInstance | null>(null);

onMounted(() => {
  if (!dropdown.value) {
    return;
  }

  jQuery(dropdown.value.$el).dropdown();
});
</script>
