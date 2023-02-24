import {Notification, NotificationCategory, createApiNotification, useNotificationStore} from '../';
import {ApiException} from '@myparcel/sdk';
import {Variant} from '@myparcel-pdk/common/src';
import {isOfType} from '@myparcel/ts-utils';

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

  const notification = createApiNotification(Variant.ERROR, options);

  if (!notification) {
    return;
  }

  store.add(notification);
};
