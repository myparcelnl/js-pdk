<template>
  <div v-test="`NotificationContainer--${category}`">
    <TransitionGroup
      appear
      :name="config?.transitions?.notification">
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
import {useAdminConfig} from '../../composables';
import {useNotificationStore} from '../../stores';

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
