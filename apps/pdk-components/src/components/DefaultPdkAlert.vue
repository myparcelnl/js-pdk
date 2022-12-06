<template>
  <Transition
    appear
    name="fade">
    <div>
      <h1
        v-if="notification.title"
        v-text="notification.title"></h1>

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
import {toArray} from '@myparcel/ts-utils';
import {variantStyleMap} from '../services';
import {PdkNotification} from '@myparcel-pdk/frontend-core';

export default defineComponent({
  name: 'DefaultPdkAlert',
  props: {
    /**
     * The notification to display.
     */
    notification: {
      type: Object as PropType<PdkNotification>,
      required: true,
    },
  },

  setup: (props) => {
    const variantClass = computed(() => {
      const variant = variantStyleMap.find((item) => item.variant === props.notification.variant);

      return [variant?.border, variant?.backgroundLight, variant?.foreground];
    });

    return {
      variantClass,
      contentArray: computed(() => toArray(props.notification.content)),
    };
  },
});
</script>
