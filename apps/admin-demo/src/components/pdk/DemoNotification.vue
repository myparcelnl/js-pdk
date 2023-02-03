<template>
  <Transition
    appear
    name="fade">
    <div :class="variantClass">
      <h1
        v-if="notification.title"
        v-text="notification.title" />

      <ul v-if="contentArray.length > 1">
        <li
          v-for="item in contentArray"
          :key="item"
          v-text="item" />
      </ul>

      <p
        v-else
        v-text="contentArray[0]" />
    </div>
  </Transition>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {PdkNotification} from '@myparcel-pdk/frontend-core';
import {toArray} from '@myparcel/ts-utils';

export default defineComponent({
  name: 'DemoNotification',
  props: {
    notification: {
      type: Object as PropType<PdkNotification>,
      required: true,
    },
  },

  setup: (props) => {
    const variantClass = computed(() => {
      const classes = ['border'];

      switch (props.notification.variant) {
        case 'primary':
          classes.push('text-indigo-600', 'border-indigo-200');
          break;

        case 'secondary':
          classes.push('text-teal-600', 'border-teal-200');
          break;

        case 'success':
          classes.push('bg-emerald-100', 'text-emerald-800', 'border-emerald-200');
          break;

        case 'warning':
          classes.push('bg-amber-100', 'text-amber-800', 'border-amber-200');
          break;

        case 'error':
          classes.push('bg-rose-100', 'text-rose-800', 'border-rose-200');
          break;

        case 'info':
          classes.push('bg-blue-100', 'text-blue-800', 'border-blue-200');
          break;
      }

      return classes;
    });

    return {
      variantClass,
      contentArray: computed(() => toArray(props.notification.content)),
    };
  },
});
</script>
