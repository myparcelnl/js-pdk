import {Variant} from '@myparcel-pdk/common';
import {Notification, NotificationCategory} from '../../../types';
import {useNotificationStore} from '../../../stores';

const TRANSLATION_KEY = 'bulk_orders_warning';

export const addBulkEditNotification = (isModal: boolean): void => {
  const notificationStore = useNotificationStore();

  notificationStore.add({
    id: TRANSLATION_KEY,
    variant: Variant.Info,
    category: isModal ? NotificationCategory.Modal : undefined,
    content: `${TRANSLATION_KEY}_description`,
    title: TRANSLATION_KEY,
    timeout: false,
  } as Notification);
};
