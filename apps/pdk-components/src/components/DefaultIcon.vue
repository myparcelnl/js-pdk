<template>
  <i v-text="icon"></i>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {PdkIcon} from '@myparcel/pdk-frontend';
import {isEnumValue} from '@myparcel/ts-utils';

/**
 * This component should be replaced.
 * @see PdkIcon
 */
export default defineComponent({
  name: 'DefaultIcon',
  props: {
    icon: {
      type: String as PropType<PdkIcon>,
      required: true,
      validator: (value: string) => isEnumValue(value, PdkIcon),
    },
  },
});
</script>
