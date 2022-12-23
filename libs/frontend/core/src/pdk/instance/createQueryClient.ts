import {NotificationCategory} from '../../types';
import {QueryClient} from '@tanstack/vue-query';
import {addErrorToNotifications} from '../../services';

export const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        onError(error) {
          addErrorToNotifications(error, NotificationCategory.API);
        },
      },

      mutations: {
        retry: false,
        onError(error) {
          addErrorToNotifications(error, NotificationCategory.API);
        },
      },
    },
  });
