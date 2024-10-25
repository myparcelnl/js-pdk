<template>
  <div v-test="[$.type.__name, category]">
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
import type {NotificationFilter} from '../../types/common.types';
import {useNotificationStore} from '../../stores/useNotificationStore';
import {useAdminConfig} from '../../composables/useAdminConfig';
import {NotificationCategory} from '../../data/constants';

const props = defineProps<{
  category?: NotificationCategory;
  filter?: NotificationFilter;
}>();

const config = useAdminConfig();

const notifications = computed(() => {
  const {notifications} = useNotificationStore();

  return notifications.filter((notification) => {
    return props.category === notification.category && (props.filter ? props.filter?.(notification) : true);
  });
});
</script>
