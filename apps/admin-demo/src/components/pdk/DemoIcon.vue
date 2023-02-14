<template>
  <i
    :class="`icon-${icon}`"
    class="icon" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {AdminIcon} from '@myparcel-pdk/frontend-core/src';
import {isEnumValue} from '@myparcel/ts-utils';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultIcon
 */
export default defineComponent({
  name: 'DemoIcon',
  props: {
    icon: {
      type: String as PropType<AdminIcon>,
      required: true,
      validator: (value: string) => isEnumValue(value, AdminIcon),
    },
  },
});
</script>
