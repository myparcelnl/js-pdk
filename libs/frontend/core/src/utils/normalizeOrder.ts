import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {Ref, ref} from 'vue';
import {EndpointResponse} from '../types';
import {memoize} from 'lodash-unified';
import {useFetchOrdersQuery} from '../actions';

type NormalizeOrder = (input: string | Plugin.ModelPdkOrder) => Ref<EndpointResponse<EndpointName.FETCH_ORDERS>>;

const memoized: NormalizeOrder = memoize((input) => {
  if (typeof input === 'string') {
    const query = useFetchOrdersQuery(input);

    if (!query.data.value) {
      throw new Error(`Order with id ${input} not found`);
    }

    return query.data;
  }

  return ref(input);
});

export const normalizeOrder: NormalizeOrder = (input) => memoized(input);
