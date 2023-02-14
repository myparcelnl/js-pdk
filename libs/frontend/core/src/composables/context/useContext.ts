import {AdminContext, AdminContextKey} from '../../types';
import {get} from '@vueuse/core';
import {useStoreContextQuery} from '../useStoreContextQuery';

export const useContext = <C extends AdminContextKey = AdminContextKey.DYNAMIC>(
  // @ts-expect-error typescript is being very pedantic here
  contextKey: C = AdminContextKey.DYNAMIC,
): NonNullable<AdminContext<C>> => {
  const query = useStoreContextQuery(contextKey);
  const data = get(query.data);

  if (!data) {
    throw new Error(`Context ${contextKey} not found`);
  }

  return data as unknown as NonNullable<AdminContext<C>>;
};
