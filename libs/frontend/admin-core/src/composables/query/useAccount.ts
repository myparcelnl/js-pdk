import {get} from '@vueuse/core';
import {Account} from '@myparcel-pdk/common';
import {useStoreContextQuery} from '../useStoreContextQuery';
import {AdminContextKey} from '../../types';

export const useAccount = (): undefined | Account.ModelAccount => {
  const contextQuery = useStoreContextQuery(AdminContextKey.Dynamic);

  return get(contextQuery.data)?.account;
};
