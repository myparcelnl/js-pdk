import {type QueryKey, type Updater, useQueryClient} from '@tanstack/vue-query';

export const patchQueryData = <D extends unknown>(queryKey: QueryKey, updater: Updater<D, D>): void => {
  const queryClient = useQueryClient();

  queryClient.setQueryData(queryKey, updater as Updater<unknown, unknown>);
};
