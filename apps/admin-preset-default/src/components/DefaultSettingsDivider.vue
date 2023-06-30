<template>
  <div v-test="AdminComponent.SettingsDivider">
    <PdkHeading
      v-if="element.props.heading"
      :level="element.props.level">
      {{ translate(element.props.heading) }}
    </PdkHeading>

    <p
      v-if="element.props.content && has(element.props.content)"
      v-text="translate(element.props.content)" />
  </div>
</template>

<script lang="ts" setup>
import {type ElementInstance, useLanguage} from '@myparcel-pdk/frontend-admin-core';
import {AdminComponent} from '@myparcel-pdk/common';

defineProps<{
  element: ElementInstance<{
    content?: string;
    heading?: string;
    level?: number | string;
  }>;
  // eslint-disable-next-line vue/no-unused-properties
  modelValue: string | number;
}>();

const {translate, has} = useLanguage();
</script>
