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
import {AdminComponent, type SettingsDividerProps, useLanguage} from '@myparcel-pdk/admin';

defineProps<SettingsDividerProps>();

const {translate, has} = useLanguage();
</script>
