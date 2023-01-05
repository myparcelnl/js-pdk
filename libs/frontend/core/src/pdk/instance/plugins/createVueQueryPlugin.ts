import {QueryClient, VueQueryPlugin} from '@tanstack/vue-query';
import {PdkAppPlugin} from './plugins.types';
import {createQueryClient} from '../createQueryClient';
import {fillOrderQueryData} from '../../fillOrderQueryData';

let queryClient: QueryClient;

/**
 * Instantiate vue query client if it does not exist yet and provide it to the app.
 */
export const createVueQueryPlugin: PdkAppPlugin = ({context, logger}) => {
  return {
    install: (app) => {
      logger.debug(`Installing vue-query plugin`);

      queryClient ??= createQueryClient();

      // Add each order to the query client
      if (context.orderData) {
        fillOrderQueryData(queryClient, context.orderData);
      }

      app.use(VueQueryPlugin, {queryClient});
    },
  };
};
