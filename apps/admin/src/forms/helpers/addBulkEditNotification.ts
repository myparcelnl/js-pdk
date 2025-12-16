import {Variant} from '@myparcel-dev/pdk-common';
import {KEY_DESCRIPTION} from '../shipmentOptions';
import {type PdkNotification} from '../../types';
import {useNotificationStore} from '../../stores';
import {NotificationCategory} from '../../data';
import {createLabel} from './createLabel';

const TRANSLATION_KEY = 'bulk_orders_warning';

export const addBulkEditNotification = (isModal: boolean): void => {
  const notificationStore = useNotificationStore();

  notificationStore.add({
    id: TRANSLATION_KEY,
    variant: Variant.Info,
    content: createLabel(TRANSLATION_KEY, KEY_DESCRIPTION),
    category: isModal ? NotificationCategory.Modal : NotificationCategory.General,
    title: TRANSLATION_KEY,
    timeout: false,
  } as PdkNotification);
};
