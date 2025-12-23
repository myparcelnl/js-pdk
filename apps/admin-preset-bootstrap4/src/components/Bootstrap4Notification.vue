<template>
  <Transition
    appear
    name="fade">
    <div
      v-test="AdminComponent.Notification"
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
import {computed} from 'vue';
import {AdminComponent, type NotificationProps} from '@myparcel-dev/pdk-admin';
import {toArray} from '@myparcel-dev/ts-utils';

const props = defineProps<NotificationProps>();

const contentArray = computed(() => toArray(props.notification.content));

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
