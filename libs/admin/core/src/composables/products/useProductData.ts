import {computed, type ComputedRef} from 'vue';
import {get} from '@vueuse/core';
import {BackendEndpoint, type Plugin} from '@myparcel-pdk/common';
import {useStoreQuery} from '../useStoreQuery';
import {useInstanceContext} from '../context';
import {validateId} from '../../utils';
import {AdminInstanceContextKey} from '../../types';
import {type ResolvedQuery} from '../../stores';

export interface UseProductData {
  product: ComputedRef<Plugin.ModelPdkProduct | undefined>;
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
