import {PdkNotification} from '@myparcel/pdk-frontend-shared';
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<PdkNotification[]>([]);

  return {
    notifications,
    add(notification: PdkNotification) {
      notifications.value.push(notification);
    },
  };
});
