import {get} from '@vueuse/core';
import {useStoreContextQuery} from '../useStoreContextQuery';
import {type AdminContext} from '../../types';
import {AdminContextKey} from '../../data';

export const useContext = <C extends AdminContextKey = AdminContextKey.Dynamic>(
  // @ts-expect-error typescript is being very pedantic here
  contextKey: C = AdminContextKey.Dynamic,
): NonNullable<AdminContext<C>> => {
  const query = useStoreContextQuery(contextKey);
  const data = get(query.data);

  if (!data) {
    throw new Error(`Context ${contextKey} not found`);
  }

  return data as unknown as NonNullable<AdminContext<C>>;
};
