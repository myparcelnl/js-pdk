import {QueryClient} from '@tanstack/vue-query';
import {NotificationCategory} from '@myparcel-pdk/admin-common';
import {useNotificationStore} from '../../stores';
import {addErrorToNotifications} from '../../services';

const clearApiNotifications = () => {
  useNotificationStore().remove(NotificationCategory.Api);
};

const addApiErrorNotification = (error: unknown) => {
  addErrorToNotifications(error, NotificationCategory.Api);
};

export const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      mutations: {
        onError: addApiErrorNotification,
        onMutate: clearApiNotifications,
        retry: false,
      },

      queries: {
        behavior: {
          onFetch: clearApiNotifications,
        },
        onError: addApiErrorNotification,
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false,
        retryOnMount: false,
        staleTime: Infinity,
      },
    },
  });
