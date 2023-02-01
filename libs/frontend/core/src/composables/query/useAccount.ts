import {Account} from '@myparcel-pdk/common';
import {get} from '@vueuse/core';
import {useFetchContextQuery} from '../../actions';

export const useAccount = (): undefined | Account.ModelAccount => {
  const contextQuery = useFetchContextQuery();

  return get(contextQuery.data)?.account;
};
