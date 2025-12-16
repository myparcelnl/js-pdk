<template>
  <div
    v-test="AdminComponent.Box"
    :class="{
      'text-muted': loading,
    }"
    class="card">
    <div
      v-if="$slots.header || title"
      class="card-header">
      <slot name="header">
        {{ translate(title) }}
      </slot>
    </div>

    <div :class="bodyClass">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {AdminComponent, type BoxEmits, type BoxProps, type BoxSlots, Size, useLanguage} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
const props = withDefaults(defineProps<BoxProps>(), {
  loading: false,
  size: Size.Medium,
});
defineEmits<BoxEmits>();
defineSlots<BoxSlots>();

const bodyClass = computed(() => ({
  'card-body': ([Size.Medium, Size.Large, Size.ExtraLarge] as Size[]).includes(props.size),
  'p-1': ([Size.Small, Size.ExtraSmall] as Size[]).includes(props.size),
}));

const {translate} = useLanguage();
</script>
