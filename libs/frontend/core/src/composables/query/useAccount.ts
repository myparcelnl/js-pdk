import {Account} from '@myparcel-pdk/common/src';
import {ContextKey} from '../../types';
import {get} from '@vueuse/core';
import {useStoreContextQuery} from '../useStoreContextQuery';

export const useAccount = (): undefined | Account.ModelAccount => {
  const contextQuery = useStoreContextQuery(ContextKey.DYNAMIC);

  return get(contextQuery.data)?.account;
};
