<template>
  <TransitionGroup
    appear
    name="mypa__fade">
    <PdkAlert
      v-for="(notification, index) in notifications"
      :key="`alert_${index}_${notification.content}`"
      :notification="notification" />
  </TransitionGroup>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useNotificationStore} from '../../stores';

export default defineComponent({
  name: 'HeaderAlerts',
  setup: () => {
    const {notifications} = useNotificationStore();

    return {
      notifications,
    };
  },
});
</script>
