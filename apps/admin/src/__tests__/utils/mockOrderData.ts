import {computed, ref} from 'vue';
import {type Mock} from 'vitest';

interface MockOrderDataOptions {
  exported?: boolean;
  shipments?: {id: number; deleted?: boolean}[];
}

export const mockOrderData = (
  mockedUseOrderData: Mock,
  {exported = false, shipments = []}: MockOrderDataOptions = {},
): void => {
  const orderData = {externalIdentifier: 'TEST-1', exported, shipments};

  mockedUseOrderData.mockReturnValue({
    order: computed(() => orderData),
    loading: computed(() => false),
    query: {data: ref(orderData), isLoading: ref(false)} as any,
  });
};
