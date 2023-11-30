import {Variant} from '@myparcel-pdk/common';
import {type PdkNotification} from '../../types';
import {useNotificationStore} from '../../stores';
import {NotificationCategory} from '../../data';

const TRANSLATION_KEY = 'bulk_orders_warning';

export const addBulkEditNotification = (isModal: boolean): void => {
  const notificationStore = useNotificationStore();

  notificationStore.add({
    id: TRANSLATION_KEY,
    variant: Variant.Info,
    content: `${TRANSLATION_KEY}_description`,
    category: isModal ? NotificationCategory.Modal : NotificationCategory.General,
    title: TRANSLATION_KEY,
    timeout: false,
  } as PdkNotification);
};
