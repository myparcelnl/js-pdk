import {NotificationCategory} from '../types';
import {useNotificationStore} from '../stores';

export const onQueryStart = (): void => {
  const store = useNotificationStore();

  store.remove(NotificationCategory.API);
};
