<template>
  <i v-text="icon" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {AdminIcon} from '@myparcel-pdk/frontend-core/src';
import {isEnumValue} from '@myparcel/ts-utils';

/**
 * This component should be replaced.
 * @see AdminIcon
 */
export default defineComponent({
  name: 'DefaultIcon',
  props: {
    icon: {
      type: String as PropType<AdminIcon>,
      required: true,
      validator: (value: string) => isEnumValue(value, AdminIcon),
    },
  },
});
</script>
