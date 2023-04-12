<template>
  <div>
    <PdkHeading
      v-if="element.props.heading && has(element.props.heading)"
      :level="element.props.level">
      {{ translate(element.props.heading) }}
    </PdkHeading>

    <p v-if="element.props.content && has(element.props.content)">
      {{ translate(element.props.content) }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import {ElementInstance, useLanguage} from '@myparcel-pdk/frontend-admin-core/src';

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
