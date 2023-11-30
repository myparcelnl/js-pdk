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

<script
  lang="ts"
  setup>
import {computed} from 'vue';
import {type NotificationFilter} from '../../types';
import {useNotificationStore} from '../../stores';
import {useAdminConfig} from '../../composables';
import {NotificationCategory} from "../../data";

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
