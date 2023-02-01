import {ContextKey, PdkContext} from '../../types';
import {get} from '@vueuse/core';
import {useFetchContextQuery} from '../../actions';

export const useContext = <C extends ContextKey = ContextKey.DYNAMIC>(
  // @ts-expect-error typescript is being very pedantic here
  contextKey: C = ContextKey.DYNAMIC,
): NonNullable<PdkContext<C>> => {
  const query = useFetchContextQuery(contextKey);

  const data = get(query.data);

  if (!data) {
    throw new Error(`Context ${contextKey} not found`);
  }

  return data as unknown as NonNullable<PdkContext<C>>;
};
