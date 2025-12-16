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

        queryClient.setQueryData([BackendEndpoint.FetchContext, contextKey], value);
      });

      const instanceContext = createInstanceContext(context);
      queryClient.setQueryData([BackendEndpoint.FetchContext, AdminContextKey.Instance], instanceContext);

      // Add each order and its shipments to the query client
      if (context.orderData) {
        context.orderData.forEach((order) => {
          fillShipmentsQueryData(queryClient, order.shipments, order);
        });
      }

      if (context.productData) {
        context.productData.forEach((product) => {
          queryClient.setQueryData([BackendEndpoint.FetchProducts, {id: product.externalIdentifier}], product);
        });
      }

      app.use(VueQueryPlugin, {queryClient});
    },
  };
};
