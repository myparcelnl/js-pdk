import {ref} from 'vue';
import {defineStore} from 'pinia';
import {isEnumValue} from '@myparcel/ts-utils';
import {type NotificationId, type PdkNotification, type ResolvedNotification} from '../types/common.types';
import {NotificationSource} from '../data/constants';

let autoId = 0;

const DEFAULT_TIMEOUT = 5000;

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<ResolvedNotification[]>([]);

  return {
    notifications,

    /**
     * Add a notification to the store.
     */
    add(notification: PdkNotification, tags?: object | Record<string, string>) {
      const resolvedNotification: ResolvedNotification = {
        timeout: true,
        dismissible: notification.timeout === false,
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
     * Remove one or more notifications from the store by tag or id.
     */
    remove(input: NotificationId | NotificationSource) {
      let filter: (notification: ResolvedNotification) => boolean;

      if (isEnumValue(input, NotificationSource)) {
        filter = (notification) => notification.tags?.source === input;
      } else {
        filter = (notification) => notification.id !== input;
      }

      notifications.value = notifications.value.filter(filter);
    },
  };
});
