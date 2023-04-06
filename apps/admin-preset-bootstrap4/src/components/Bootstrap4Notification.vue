<template>
  <Transition
    appear
    name="fade">
    <div
      :class="alertClasses"
      class="alert"
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

<script lang="ts" setup>
import {PropType, computed} from 'vue';
import {Notification} from '@myparcel-pdk/frontend-admin-core/src';
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

const alertClasses = computed(() => {
  switch (props.notification?.variant) {
    case 'success':
      return 'alert-success';
    case 'warning':
      return 'alert-warning';
    case 'error':
      return 'alert-danger';
    default:
      return 'alert-info';
  }
});
</script>
