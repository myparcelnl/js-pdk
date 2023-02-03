import {ContextKey, PdkContext} from '../../types';
import {get} from '@vueuse/core';
import {useStoreContextQuery} from '../useStoreContextQuery';

export const useContext = <C extends ContextKey = ContextKey.DYNAMIC>(
  // @ts-expect-error typescript is being very pedantic here
  contextKey: C = ContextKey.DYNAMIC,
): NonNullable<PdkContext<C>> => {
  const query = useStoreContextQuery(contextKey);
  const data = get(query.data);

  if (!data) {
    throw new Error(`Context ${contextKey} not found`);
  }

  return data as unknown as NonNullable<PdkContext<C>>;
};
