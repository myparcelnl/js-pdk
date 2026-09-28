import {Variant} from '@myparcel-dev/pdk-common';
import {type PdkNotification} from '../../types';
import {useNotificationStore} from '../../stores';
import {NotificationCategory} from '../../data';
import {useLanguage} from '../../composables';

export const LABELS_NOTIFICATION_ID = 'print-labels';

const replace = (notification: Omit<PdkNotification, 'id' | 'category'>): void => {
  const store = useNotificationStore();

  store.remove(LABELS_NOTIFICATION_ID);
  store.add({...notification, id: LABELS_NOTIFICATION_ID, category: NotificationCategory.General});
};

export const showLabelsLoading = (): void => {
  replace({
    variant: Variant.Info,
    content: useLanguage().translate('notification_labels_loading'),
    loading: true,
    timeout: false,
  });
};

export const showLabelsReady = (open: () => void): void => {
  const {translate} = useLanguage();

  replace({
    variant: Variant.Success,
    content: translate('notification_labels_ready'),
    timeout: false,
    action: {
      label: translate('action_open_labels'),
      onClick() {
        open();
        hideLabelsNotification();
      },
    },
  });
};

export const showLabelsFailed = (): void => {
  replace({
    variant: Variant.Error,
    content: useLanguage().translate('notification_labels_failed'),
    timeout: false,
  });
};

export const hideLabelsNotification = (): void => {
  useNotificationStore().remove(LABELS_NOTIFICATION_ID);
};
