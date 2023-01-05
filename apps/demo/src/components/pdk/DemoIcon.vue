<template>
  <i
    :class="`icon-${icon}`"
    class="icon" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {PdkIcon} from '@myparcel-pdk/frontend-core';
import {isEnumValue} from '@myparcel/ts-utils';

/**
 * @see import('@myparcel/pdk-components').DefaultIcon
 */
export default defineComponent({
  name: 'DemoIcon',
  props: {
    icon: {
      type: String as PropType<PdkIcon>,
      required: true,
      validator: (value: string) => isEnumValue(value, PdkIcon),
    },
  },
});
</script>
