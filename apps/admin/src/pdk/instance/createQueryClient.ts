import {QueryClient} from '@tanstack/vue-query';
import {useNotificationStore} from '../../stores';
import {addErrorToNotifications} from '../../services';
import {NotificationCategory} from '../../data';

const clearApiNotifications = () => {
  useNotificationStore().remove(NotificationCategory.Api);
};

export const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      mutations: {
        onMutate: clearApiNotifications,
        retry: false,
      },

      queries: {
        behavior: {
          onFetch: clearApiNotifications,
        },
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
