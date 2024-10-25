import {Variant} from '@myparcel-pdk/common';
import {isOfType} from '@myparcel/ts-utils';
import {type ApiException} from '@myparcel/sdk';
import {type PdkNotification} from '../types/common.types';
import {useNotificationStore} from '../stores/useNotificationStore';
import {type NotificationCategory} from '../data/constants';
import {createNotification} from './createNotification';

export const addErrorToNotifications = (
  error: unknown,
  category: NotificationCategory,
  timeout: boolean | number = false,
): void => {
  const store = useNotificationStore();
  const options: Partial<PdkNotification> = {category, timeout};

  if (isOfType<ApiException>(error, 'data')) {
    options.content = error.data.errors.map((error) => `${error.title} (code: ${error.code})`);
  }

  if (isOfType<Error>(error, 'message')) {
    options.title = error.message;
    options.content = error.stack;
  }

  const notification = createNotification(Variant.Error, options);

  if (!notification) {
    return;
  }

  store.add(notification);
};
