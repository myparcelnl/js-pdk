import {NotificationCategory, PdkNotification, createApiErrorNotification, useNotificationStore} from '../';
import {ApiException} from '@myparcel/sdk';
import {PdkVariant} from '@myparcel-pdk/common';
import {isOfType} from '@myparcel/ts-utils';

export const addErrorToNotifications = (error: unknown, category: NotificationCategory): void => {
  const store = useNotificationStore();
  const options: Partial<PdkNotification> = {category};

  if (isOfType<ApiException>(error, 'data')) {
    options.content = error.data.errors.map((error) => `${error.title} (code: ${error.code})`);
  }

  if (isOfType<Error>(error, 'message')) {
    options.title = error.message;
    options.content = error.stack;
  }

  return store.add(createApiErrorNotification(PdkVariant.ERROR, options));
};
