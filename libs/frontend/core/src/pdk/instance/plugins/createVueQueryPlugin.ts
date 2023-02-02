import {QueryClient, VueQueryPlugin} from '@tanstack/vue-query';
import {ContextKey} from '../../../types';
import {EndpointName} from '@myparcel-pdk/common';
import {PdkAppPlugin} from './plugins.types';
import {createInstanceContext} from '../createInstanceContext';
import {createQueryClient} from '../createQueryClient';
import {fillOrderQueryData} from '../../fillOrderQueryData';

let queryClient: QueryClient;

/**
 * Instantiate vue query client if it does not exist yet and provide it to the app.
 */
export const createVueQueryPlugin: PdkAppPlugin = ({context, logger}) => {
  return {
    install: (app) => {
      logger.debug('Installing vue-query plugin');

      queryClient ??= createQueryClient();

      // Fill the query client with the context data
      Object.entries(context).forEach(([contextKey, value]) => {
        if (!value) {
          return;
        }

        queryClient.setQueryData([EndpointName.FETCH_CONTEXT, contextKey], value);
      });

      const instanceContext = createInstanceContext(context);
      queryClient.setQueryData([EndpointName.FETCH_CONTEXT, ContextKey.INSTANCE], instanceContext);

      // Add each order to the query client
      if (context.orderData) {
        fillOrderQueryData(queryClient, context.orderData);
      }

      app.use(VueQueryPlugin, {queryClient});
    },
  };
};
