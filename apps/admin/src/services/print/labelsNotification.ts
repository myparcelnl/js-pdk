import {type Pinia} from 'pinia';
import {Variant} from '@myparcel-dev/pdk-common';
import {type PdkNotification} from '../../types';
import {useNotificationStore} from '../../stores';
import {NotificationCategory} from '../../data';
import {useLanguage} from '../../composables';

export const LABELS_NOTIFICATION_ID = 'print-labels';

/**
 * The print flow shows these notifications after it waited for the pdf. Pass the
 * store of the admin instance that started the print, because the active Pinia
 * can already belong to a newer instance by then.
 */
const replace = (notification: Omit<PdkNotification, 'id' | 'category'>, pinia?: Pinia): void => {
  const store = useNotificationStore(pinia);

  store.remove(LABELS_NOTIFICATION_ID);
  store.add({...notification, id: LABELS_NOTIFICATION_ID, category: NotificationCategory.General});
};

export const showLabelsLoading = (pinia?: Pinia): void => {
  replace(
    {
      variant: Variant.Info,
      content: useLanguage().translate('notification_labels_loading'),
      loading: true,
      timeout: false,
    },
    pinia,
  );
};

export const hideLabelsNotification = (pinia?: Pinia): void => {
  useNotificationStore(pinia).remove(LABELS_NOTIFICATION_ID);
};

export const showLabelsReady = (open: () => void, pinia?: Pinia): void => {
  const {translate} = useLanguage();

  replace(
    {
      variant: Variant.Success,
      content: translate('notification_labels_ready'),
      timeout: false,
      action: {
        label: translate('action_open_labels'),
        onClick() {
          open();
          hideLabelsNotification(pinia);
        },
      },
    },
    pinia,
  );
};

export const showLabelsFailed = (pinia?: Pinia): void => {
  replace(
    {
      variant: Variant.Error,
      content: useLanguage().translate('notification_labels_failed'),
      timeout: false,
    },
    pinia,
  );
};
