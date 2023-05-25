<template>
  <div v-test="`NotificationContainer--${category}`">
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

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {NotificationCategory} from '../../types';
import {useNotificationStore} from '../../stores';
import {useAdminConfig} from '../../composables';

export default defineComponent({
  name: 'NotificationContainer',

  props: {
    category: {
      type: String as PropType<NotificationCategory>,
      default: () => NotificationCategory.General,
    },
  },

  setup: (props) => {
    return {
      config: useAdminConfig(),

      notifications: computed(() => {
        const {notifications} = useNotificationStore();

        return notifications.filter((notification) => {
          return notification.category === props.category;
        });
      }),
    };
  },
});
</script>
