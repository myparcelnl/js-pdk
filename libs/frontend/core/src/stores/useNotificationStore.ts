import {NotificationCategory, PdkNotification} from '../';
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<PdkNotification[]>([]);

  return {
    notifications,

    /**
     * Add a notification to the store.
     */
    add(notification: PdkNotification) {
      notifications.value.push({
        category: NotificationCategory.GENERAL,
        ...notification,
      });
    },

    /**
     * Remove one or more notifications from the store by category.
     */
    remove(category: NotificationCategory) {
      notifications.value = notifications.value.filter((notification) => notification.category !== category);
    },
  };
});
