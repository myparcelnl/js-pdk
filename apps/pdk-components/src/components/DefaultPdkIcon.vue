<template>
  <i
    :class="`icon-${icon}`"
    class="icon"></i>
</template>

<script lang="ts">
import {PdkIcon} from '@myparcel-pdk/frontend-core';
import {defineComponent} from 'vue';
import {isEnumValue} from '@myparcel/ts-utils';

/**
 * A simple icon component.
 */
export default defineComponent({
  name: 'DefaultPdkIcon',
  props: {
    icon: {
      type: String,
      required: true,
      validator: (value: string) => isEnumValue(value, PdkIcon),
    },
  },
});
</script>
