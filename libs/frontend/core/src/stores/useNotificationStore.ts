import {Notification, NotificationCategory, NotificationId} from '../';
import {defineStore} from 'pinia';
import {isEnumValue} from '@myparcel/ts-utils';
import {ref} from 'vue';

let autoId = 0;

const DEFAULT_TIMEOUT = 5000;

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([]);

  return {
    notifications,

    /**
     * Add a notification to the store.
     */
    add(notification: Notification) {
      notification.category ??= NotificationCategory.General;
      const id = notification.id ?? autoId++;

      if (notification.timeout !== false) {
        const timeout = typeof notification.timeout === 'number' ? notification.timeout : DEFAULT_TIMEOUT;

        setTimeout(() => {
          this.remove(id);
        }, timeout);
      }

      if (notifications.value.some((notification) => notification.id === id)) {
        return;
      }

      notifications.value.push({...notification, id});
    },

    /**
     * Remove one or more notifications from the store by category or id.
     */
    remove(input: NotificationId | NotificationCategory) {
      let filter: (notification: Notification) => boolean;

      if (isEnumValue(input, NotificationCategory)) {
        filter = (notification) => notification.category !== input;
      } else {
        filter = (notification) => notification.id !== input;
      }

      notifications.value = notifications.value.filter(filter);
    },
  };
});
