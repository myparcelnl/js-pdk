<template>
  <div
    :class="{
      'text-muted': loading,
    }"
    class="card">
    <div
      v-if="$slots.header || title"
      class="card-header">
      <!-- Box header. -->
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
import {computed, type PropType} from 'vue';
import {Size, useLanguage} from '@myparcel-pdk/admin';

const props = defineProps({
  loading: {
    type: Boolean,
  },

  size: {
    type: String as PropType<Size>,
    default: Size.Medium,
  },

  title: {
    type: String,
    default: null,
  },
});

const bodyClass = computed(() => ({
  'card-body': [Size.Medium, Size.Large, Size.ExtraLarge].includes(props.size),
  'p-1': [Size.Small, Size.ExtraSmall].includes(props.size),
}));

const {translate} = useLanguage();
</script>
