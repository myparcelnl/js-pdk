import {type QueryClient, VueQueryPlugin} from '@tanstack/vue-query';
import {AdminContextKey, BackendEndpoint} from '@myparcel-dev/pdk-common';
import {createQueryClient} from '../createQueryClient';
import {createInstanceContext} from '../createInstanceContext';
import {fillShipmentsQueryData} from '../../fillShipmentsQueryData';
import {type PdkAppPlugin} from './plugins.types';

let queryClient: QueryClient;

/**
 * Instantiate vue query client if it does not exist yet and provide it to the app.
 */
export const createVueQueryPlugin: PdkAppPlugin = ({context, logger, queryClient: instanceQueryClient}) => {
  return {
    install: (app) => {
      logger.debug('Installing vue-query plugin');

      const client = instanceQueryClient ?? (queryClient ??= createQueryClient());

      // Fill the query client with the context data
      Object.entries(context).forEach(([contextKey, value]) => {
        if (!value) {
          return;
        }

        client.setQueryData([BackendEndpoint.FetchContext, contextKey], value);
      });

      const instanceContext = createInstanceContext(context);
      client.setQueryData([BackendEndpoint.FetchContext, AdminContextKey.Instance], instanceContext);

      // Add each order and its shipments to the query client
      if (context.orderData) {
        context.orderData.forEach((order) => {
          fillShipmentsQueryData(client, order.shipments, order);
        });
      }

      if (context.productData) {
        context.productData.forEach((product) => {
          client.setQueryData([BackendEndpoint.FetchProducts, {id: product.externalIdentifier}], product);
        });
      }

      app.use(VueQueryPlugin, {queryClient: client});
    },
  };
};
