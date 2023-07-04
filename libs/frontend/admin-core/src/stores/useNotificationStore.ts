import {ref} from 'vue';
import {defineStore} from 'pinia';
import {isEnumValue} from '@myparcel/ts-utils';
import {type Notification, NotificationCategory, type NotificationId, type ResolvedNotification} from '..';

let autoId = 0;

const DEFAULT_TIMEOUT = 5000;

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<ResolvedNotification[]>([]);

  return {
    notifications,

    /**
     * Add a notification to the store.
     */
    add(notification: Notification, tags?: Record<string, unknown>) {
      const resolvedNotification: ResolvedNotification = {
        timeout: true,
        dismissible: notification.timeout === false,
        category: NotificationCategory.General,
        id: notification.id ?? autoId++,
        ...notification,
        tags: {
          ...notification.tags,
          ...tags,
        },
      };

      const {id} = resolvedNotification;

      if (notifications.value.some((notification) => notification.id === id)) {
        return;
      }

      if (notification.timeout !== false) {
        const timeout =
          typeof resolvedNotification.timeout === 'number' ? resolvedNotification.timeout : DEFAULT_TIMEOUT;

        setTimeout(() => {
          this.remove(id);
        }, timeout);
      }

      notifications.value.push(resolvedNotification);
    },

    /**
     * Remove one or more notifications from the store by category or id.
     */
    remove(input: NotificationId | NotificationCategory) {
      let filter: (notification: ResolvedNotification) => boolean;

      if (isEnumValue(input, NotificationCategory)) {
        filter = (notification) => notification.category !== input;
      } else {
        filter = (notification) => notification.id !== input;
      }

      notifications.value = notifications.value.filter(filter);
    },
  };
});
