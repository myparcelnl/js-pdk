import {NotificationCategory, useNotificationStore} from '../.';

export const onQueryStart = (): void => {
  const store = useNotificationStore();

  store.remove(NotificationCategory.API);
};
