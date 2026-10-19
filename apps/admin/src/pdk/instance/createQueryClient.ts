import {type Pinia} from 'pinia';
import {QueryClient} from '@tanstack/vue-query';
import {useNotificationStore} from '../../stores';
import {addErrorToNotifications} from '../../services';
import {NotificationCategory} from '../../data';

/**
 * Creates the query client of one PdkAdmin instance. Pass the store of that
 * instance: the default callbacks run after async work, when the active Pinia
 * can already belong to a newer instance.
 */
export const createQueryClient = (store?: Pinia): QueryClient => {
  const clearApiNotifications = () => {
    useNotificationStore(store).remove(NotificationCategory.Api);
  };

  return new QueryClient({
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
};
