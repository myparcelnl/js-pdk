import {NotificationCategory} from '../../types';
import {QueryClient} from '@tanstack/vue-query';
import {addErrorToNotifications} from '../../services';
import {useNotificationStore} from '../../stores';

export const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: true,
        staleTime: Infinity,
        behavior: {
          onFetch() {
            useNotificationStore().remove(NotificationCategory.API);
          },
        },

        onError(error) {
          addErrorToNotifications(error, NotificationCategory.API);
        },
      },

      mutations: {
        retry: false,
        onMutate() {
          useNotificationStore().remove(NotificationCategory.API);
        },

        onError(error) {
          addErrorToNotifications(error, NotificationCategory.API);
        },
      },
    },
  });
