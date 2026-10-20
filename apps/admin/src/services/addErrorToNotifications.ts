import {Variant} from '@myparcel-dev/pdk-common';
import {isOfType} from '@myparcel-dev/ts-utils';
import {type ApiException} from '@myparcel-dev/sdk';
import {type PdkNotification} from '../types';
import {useNotificationStore} from '../stores';
import {type NotificationCategory} from '../data';
import {createNotification} from './createNotification';

export const addErrorToNotifications = (
  error: unknown,
  category: NotificationCategory,
  timeout: boolean | number = false,
): void => {
  const store = useNotificationStore();
  const options: Partial<PdkNotification> = {category, timeout};

  if (isOfType<Error>(error, 'message')) {
    options.title = error.message;

    options.content = error.stack;
  }

  // Override stacktrace if the error is an ApiException
  if (isOfType<ApiException>(error, 'data')) {
    options.content = error.data.errors.map((error) => `${error.title} (code: ${error.code})`);
  }

  const notification = createNotification(Variant.Error, options);

  if (!notification) {
    return;
  }

  store.add(notification);
};
