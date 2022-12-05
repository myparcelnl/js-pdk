<template>
  <TransitionGroup
    appear
    :name="pdkConfig.transitions.notification">
    <PdkAlert
      v-for="(notification, index) in notifications"
      :key="`alert_${index}_${notification.content}`"
      :notification="notification" />
  </TransitionGroup>
</template>

<script lang="ts">
import {NotificationCategory, useNotificationStore, usePdkConfig} from '../';
import {PropType, computed, defineComponent, toRefs} from 'vue';

export default defineComponent({
  name: 'NotificationContainer',

  props: {
    category: {
      type: String as PropType<NotificationCategory>,
      default: () => NotificationCategory.GENERAL,
    },
  },

  setup: (props) => {
    const propRefs = toRefs(props);
    const pdkConfig = usePdkConfig();

    return {
      pdkConfig,
      notifications: computed(() => {
        const {notifications} = useNotificationStore();

        return notifications.filter((notification) => {
          return notification.category === propRefs.category.value;
        });
      }),
    };
  },
});
</script>
