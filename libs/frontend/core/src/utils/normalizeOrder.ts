import {Ref, ref} from 'vue';
import {UseOrderQueryResponse, useFetchOrdersQuery} from '../actions';
import {Plugin} from '@myparcel-pdk/common';
import {memoize} from 'lodash-unified';

type NormalizeOrder = (input: string | Plugin.ModelPdkOrder) => Ref<UseOrderQueryResponse>;

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
