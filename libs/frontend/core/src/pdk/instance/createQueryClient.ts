import {NotificationCategory} from '../../types';
import {QueryClient} from '@tanstack/vue-query';
import {addErrorToNotifications} from '../../services';
import {useNotificationStore} from '../../stores';

const clearApiNotifications = () => {
  useNotificationStore().remove(NotificationCategory.API);
};

const addApiErrorNotification = (error: unknown) => {
  addErrorToNotifications(error, NotificationCategory.API);
};

export const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        behavior: {
          onFetch: clearApiNotifications,
        },
        onError: addApiErrorNotification,
      },

      mutations: {
        retry: false,
        onMutate: clearApiNotifications,
        onError: addApiErrorNotification,
      },
    },
  });
