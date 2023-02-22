<template>
  <Transition
    appear
    name="fade">
    <div
      :class="`alert alert-${notification.variant}`"
      role="alert">
      <div class="alert-text">
        <strong
          v-if="notification.title"
          class="mb-1"
          v-text="notification.title" />

        <p
          v-for="(item, index) in contentArray"
          :key="`alert_${index}_${item}`"
          v-text="item" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {PropType, computed} from 'vue';
import {Notification} from '@myparcel-pdk/frontend-core/src';
import {toArray} from '@myparcel/ts-utils';

const props = defineProps({
  /**
   * The notification to display.
   */
  notification: {
    type: Object as PropType<Notification>,
    required: true,
  },
});

const contentArray = computed(() => {
  return toArray(props.notification.content);
});
</script>
