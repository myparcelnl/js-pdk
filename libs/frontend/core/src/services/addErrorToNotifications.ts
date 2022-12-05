import {ApiException} from '@myparcel/sdk';
import {isOfType} from '@myparcel/ts-utils';
import {NotificationCategory, useNotificationStore} from '../';

export const addErrorToNotifications = (error: unknown, category: NotificationCategory): void => {
  const store = useNotificationStore();

  console.log(error);

  if (isOfType<ApiException>(error, 'data')) {
    return store.add({
      variant: 'danger',
      category: category,
      title: error.message,
      content: error.data.errors.map((error) => `${error.title} (code: ${error.code})`),
    });
  }

  if (isOfType<Error>(error, 'message')) {
    return store.add({
      variant: 'danger',
      category: category,
      title: error.message,
      content: error.stack,
    });
  }
};
