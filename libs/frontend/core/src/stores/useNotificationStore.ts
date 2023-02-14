import {Notification, NotificationCategory} from '../';
import {defineStore} from 'pinia';
import {ref} from 'vue';

let id = 0;

const DEFAULT_TIMEOUT = 5000;

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([]);

  return {
    notifications,

    /**
     * Add a notification to the store.
     */
    add(notification: Notification) {
      notification.category ??= NotificationCategory.GENERAL;
      const notificationId = id++;

      if (notification.timeout) {
        const timeout = typeof notification.timeout === 'number' ? notification.timeout : DEFAULT_TIMEOUT;

        setTimeout(() => {
          this.remove(notificationId);
        }, timeout);
      }

      notifications.value.push({...notification, id: notificationId});
    },

    /**
     * Remove one or more notifications from the store by category or id.
     */
    remove(input: number | NotificationCategory) {
      let filter: (notification: Notification) => boolean;

      if (typeof input === 'number') {
        filter = (notification) => notification.id !== input;
      } else {
        filter = (notification) => notification.category !== input;
      }

      notifications.value = notifications.value.filter(filter);
    },
  };
});
