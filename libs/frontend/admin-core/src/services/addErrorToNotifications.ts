import {Variant} from '@myparcel-pdk/common';
import {isOfType} from '@myparcel/ts-utils';
import {type ApiException} from '@myparcel/sdk';
import {type Notification, type NotificationCategory, createApiNotification, useNotificationStore} from '..';

export const addErrorToNotifications = (error: unknown, category: NotificationCategory): void => {
  const store = useNotificationStore();
  const options: Partial<Notification> = {category};

  if (isOfType<ApiException>(error, 'data')) {
    options.content = error.data.errors.map((error) => `${error.title} (code: ${error.code})`);
  }

  if (isOfType<Error>(error, 'message')) {
    options.title = error.message;
    options.content = error.stack;
  }

  const notification = createApiNotification(Variant.Error, options);

  if (!notification) {
    return;
  }

  store.add(notification);
};
