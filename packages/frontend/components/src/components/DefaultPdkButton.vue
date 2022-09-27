<template>
  <button
    :class="{
      'px-5 py-2': !size,
      'px-3 py-1 text-sm': 'sm' === size,
      'px-2 py-0.5 text-xs': 'xs' === size,
    }"
    :disabled="disabled"
    class="active:bg-orange-800 bg-orange-600 duration-75 focus:bg-orange-700 hover:bg-orange-700 rounded-full text-white transition-colors"
    type="button"
    @click="() => $emit('click')">
    <PdkIcon
      v-for="iconName in icons"
      :key="iconName"
      class="mr-1">
      {{ iconName }}
    </PdkIcon>
    <slot>
      {{ translate(label) }}
    </slot>
  </button>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {Variant, toArray} from '@myparcel/pdk-frontend-shared';
import {useTranslate} from '@myparcel/pdk-frontend';

export default defineComponent({
  name: 'DefaultPdkButton',
  props: {
    variant: {
      type: String as PropType<Variant>,
      default: null,
    },

    disabled: {
      type: Boolean,
    },

    size: {
      type: String,
      default: null,
    },

    icon: {
      type: [Array, String] as PropType<string | string[]>,
      default: () => [],
    },

    label: {
      type: String,
      default: 'save',
    },
  },

  emits: ['click'],

  setup: (props) => ({
    translate: useTranslate(),
    icons: computed(() => toArray(props.icon)),
  }),
});
</script>
