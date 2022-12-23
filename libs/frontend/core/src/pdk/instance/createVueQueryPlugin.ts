import {QueryClient, VueQueryPlugin} from '@tanstack/vue-query';
import {PdkAppPlugin} from '../types';
import {createQueryClient} from './index';
import {fillOrderQueryData} from '../fillOrderQueryData';
import {globalLogger} from '../../services';

let queryClient: QueryClient;

/**
 * Instantiate vue query client if it does not exist yet and provide it to the app.
 */
export const createVueQueryPlugin: PdkAppPlugin = ({context}) => {
  return {
    install: (app) => {
      globalLogger.debug(`Installing vue-query plugin`);

      queryClient ??= createQueryClient();

      // Add each order to the query client
      if (context.orderData) {
        fillOrderQueryData(queryClient, context.orderData);
      }

      app.use(VueQueryPlugin, {queryClient});
    },
  };
};
