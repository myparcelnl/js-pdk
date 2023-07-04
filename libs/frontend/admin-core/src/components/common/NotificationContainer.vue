<template>
  <div>
    <TransitionGroup
      :name="config?.transitions?.notification"
      appear>
      <PdkNotification
        v-for="(notification, index) in notifications"
        :key="`alert_${index}_${notification.content}`"
        :notification="notification" />
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {
  type Notification,
  type NotificationCategory,
  useAdminConfig,
  useNotificationStore,
} from '@myparcel-pdk/frontend-admin-core';

const props = defineProps<{
  category: NotificationCategory;
  filter?: (notification: Notification) => boolean;
}>();

const config = useAdminConfig();

const notifications = computed(() => {
  const {notifications} = useNotificationStore();

  return notifications.filter((notification) => {
    return notification.category === props.category && (props.filter ? props.filter?.(notification) : true);
  });
});
</script>
