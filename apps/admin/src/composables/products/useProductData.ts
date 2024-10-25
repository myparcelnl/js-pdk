import {computed, type ComputedRef} from 'vue';
import {get} from '@vueuse/core';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {useStoreQuery} from '../useStoreQuery';
import {useInstanceContext} from '../context/useInstanceContext';
import {validateId} from '../../utils/validateId';
import {type ResolvedQuery} from '../../stores/types';
import {AdminInstanceContextKey} from '../../data/constants';

export interface UseProductData {
  product: ComputedRef;
  query: ResolvedQuery<BackendEndpoint.FetchProducts>;
}

export const useProductData = (externalIdentifier?: string): UseProductData => {
  const productId = validateId(externalIdentifier ?? useInstanceContext(AdminInstanceContextKey.ProductIdentifier));

  const fetchQuery = useStoreQuery(BackendEndpoint.FetchProducts, productId);

  return {
    product: computed(() => get(fetchQuery.data)),
    query: fetchQuery,
  };
};
