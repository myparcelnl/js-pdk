import {computed, type ComputedRef, toValue} from 'vue';
import {BackendEndpoint} from '@myparcel-dev/pdk-common';
import {useStoreQuery} from '../useStoreQuery';
import {useInstanceContext} from '../context';
import {validateId} from '../../utils';
import {type ResolvedQuery} from '../../stores';
import {AdminInstanceContextKey} from '../../data';

export interface UseProductData {
  product: ComputedRef;
  query: ResolvedQuery<BackendEndpoint.FetchProducts>;
}

export const useProductData = (externalIdentifier?: string): UseProductData => {
  const productId = validateId(externalIdentifier ?? useInstanceContext(AdminInstanceContextKey.ProductIdentifier));

  const fetchQuery = useStoreQuery(BackendEndpoint.FetchProducts, productId);

  return {
    product: computed(() => toValue(fetchQuery.data)),
    query: fetchQuery,
  };
};
