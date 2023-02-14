import {Account} from '@myparcel-pdk/common/src';
import {AdminContextKey} from '../../types';
import {get} from '@vueuse/core';
import {useStoreContextQuery} from '../useStoreContextQuery';

export const useAccount = (): undefined | Account.ModelAccount => {
  const contextQuery = useStoreContextQuery(AdminContextKey.DYNAMIC);

  return get(contextQuery.data)?.account;
};
