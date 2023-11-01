import {type QueryClient, type QueryKey} from '@tanstack/vue-query';
import {globalLogger} from '../../services';

export const setQueryData = (queryClient: QueryClient, queryKey: QueryKey, data: unknown): void => {
  globalLogger.debug('QUERY UPDATE:', JSON.stringify(queryKey));

  queryClient.setQueryData(queryKey, data);
};
