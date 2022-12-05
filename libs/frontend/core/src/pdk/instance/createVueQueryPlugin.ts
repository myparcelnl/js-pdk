import {QueryClient, VueQueryPlugin} from '@tanstack/vue-query';
import {NotificationCategory} from '../../types';
import {Plugin} from 'vue';
import {addErrorToNotifications} from '../../services';

let queryClient: QueryClient;

// eslint-disable-next-line max-lines-per-function
const createQueryClient = (): QueryClient =>
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

export const createVueQueryPlugin = (): Plugin => {
  return {
    install(app) {
      queryClient ??= createQueryClient();

      app.use(VueQueryPlugin, {queryClient});
    },
  };
};
