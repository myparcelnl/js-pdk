import {QueryClient, VueQueryPlugin} from '@tanstack/vue-query';
import {FinalPdkConfiguration} from '../types';
import {Plugin} from 'vue';
import {createQueryClient} from './instance';
import {fillOrderQueryData} from './fillOrderQueryData';
import {logger} from '@myparcel-pdk/frontend-shared/src';

let queryClient: QueryClient;

/**
 * Instantiate vue query client if it does not exist yet and provide it to the app.
 */
export const createVueQueryPlugin = (config: FinalPdkConfiguration): Plugin => {
  return {
    install: (app) => {
      logger.debug('Installing vue-query plugin');

      queryClient ??= createQueryClient();

      // Add each order to the query client
      fillOrderQueryData(queryClient, config.context.orderData);

      app.use(VueQueryPlugin, {queryClient});
    },
  };
};
