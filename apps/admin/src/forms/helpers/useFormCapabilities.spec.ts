import {describe, expect, it, vi, beforeEach} from 'vitest';
import {ref} from 'vue';
import {AdminContextKey, BackendEndpoint, type CarrierModel, TriState} from '@myparcel-dev/pdk-common';

type FakeQuery = {
  status: ReturnType<typeof ref<string>>;
  data: ReturnType<typeof ref<unknown>>;
};

const orderModifier = (id: string) => `${id}.order`;
const shipmentModifier = (id: string) => `${id}.shipment`;

const buildQueryStore = () => {
  const queries = new Map<string, FakeQuery>();
  const dynamicCarriers = ref<CarrierModel[]>([]);

  return {
    queries,
    dynamicCarriers,
    setQuery: (modifier: string, status: string, data: unknown) =>
      queries.set(`${BackendEndpoint.ProxyCapabilities}.${modifier}`, {
        status: ref(status),
        data: ref(data),
      }),
    setDynamicCarriers: (carriers: CarrierModel[]) => {
      dynamicCarriers.value = carriers;
    },
    has: (endpoint: BackendEndpoint, modifier: string) =>
      queries.has(`${endpoint}.${modifier}`),
    get: (endpoint: BackendEndpoint, modifier?: string) => {
      if (endpoint === BackendEndpoint.FetchContext && modifier === AdminContextKey.Dynamic) {
        return {
          status: ref('success'),
          data: ref({carriers: dynamicCarriers.value}),
        };
      }

      return queries.get(`${endpoint}.${modifier}`) ?? {status: ref('idle'), data: ref(undefined)};
    },
  };
};

let queryStore: ReturnType<typeof buildQueryStore>;
let mockOrderId: string | undefined = 'order-1';

vi.mock('../../stores', () => ({
  useQueryStore: () => queryStore,
}));

vi.mock('../../utils', () => ({
  getOrderId: () => mockOrderId,
}));

vi.mock('../../composables', () => ({
  Format: {Currency: 'currency'},
  useContext: () => ({carriers: []}),
}));

const buildCarrier = (overrides: Partial<CarrierModel>): CarrierModel =>
  ({
    carrier: 'POSTNL',
    packageTypes: [],
    deliveryTypes: [],
    options: {},
    ...overrides,
  }) as CarrierModel;

const formStub = (carrierName: string) => ({
  getValue: (name: string) => (name === 'deliveryOptions.carrier' ? carrierName : undefined),
}) as never;

describe('useFormCapabilities', () => {
  beforeEach(() => {
    queryStore = buildQueryStore();
    mockOrderId = 'order-1';
  });

  describe('getCarrierForOrder', () => {
    it('returns the order-query carrier when the query is success and the chosen carrier is in the results', async () => {
      const order = buildCarrier({carrier: 'POSTNL', packageTypes: ['PACKAGE']});
      const dynamic = buildCarrier({carrier: 'POSTNL', packageTypes: ['DIGITAL_STAMP']});
      queryStore.setQuery(orderModifier('order-1'), 'success', [order]);
      queryStore.setDynamicCarriers([dynamic]);

      const {useFormCapabilities} = await import('./useFormCapabilities');
      const caps = useFormCapabilities();

      expect(caps.getCarrierForOrder(formStub('POSTNL'))).toEqual(order);
    });

    it('falls back to dynamic carriers when the query is loading', async () => {
      const dynamic = buildCarrier({carrier: 'POSTNL'});
      queryStore.setQuery(orderModifier('order-1'), 'loading', undefined);
      queryStore.setDynamicCarriers([dynamic]);

      const {useFormCapabilities} = await import('./useFormCapabilities');

      expect(useFormCapabilities().getCarrierForOrder(formStub('POSTNL'))).toEqual(dynamic);
    });

    it('falls back to dynamic carriers when the query is errored (loading-state masquerade is intentional)', async () => {
      const dynamic = buildCarrier({carrier: 'POSTNL'});
      queryStore.setQuery(orderModifier('order-1'), 'error', undefined);
      queryStore.setDynamicCarriers([dynamic]);

      const {useFormCapabilities} = await import('./useFormCapabilities');

      expect(useFormCapabilities().getCarrierForOrder(formStub('POSTNL'))).toEqual(dynamic);
    });

    it('falls back to dynamic carriers when the orderId is missing (bulk path)', async () => {
      mockOrderId = undefined;
      const dynamic = buildCarrier({carrier: 'POSTNL'});
      queryStore.setDynamicCarriers([dynamic]);

      const {useFormCapabilities} = await import('./useFormCapabilities');

      expect(useFormCapabilities().getCarrierForOrder(formStub('POSTNL'))).toEqual(dynamic);
    });
  });

  describe('getCarrierForShipment tri-state', () => {
    it('returns the narrow shipment carrier when the query is success and the carrier matches', async () => {
      const shipment = buildCarrier({
        carrier: 'POSTNL',
        options: {requiresSignature: {isRequired: true} as never},
      });
      queryStore.setQuery(shipmentModifier('order-1'), 'success', [shipment]);

      const {useFormCapabilities} = await import('./useFormCapabilities');

      expect(useFormCapabilities().getCarrierForShipment(formStub('POSTNL'))).toEqual(shipment);
    });

    it('falls back to order data when the shipment query is loading', async () => {
      const order = buildCarrier({carrier: 'POSTNL', packageTypes: ['PACKAGE']});
      queryStore.setQuery(orderModifier('order-1'), 'success', [order]);
      queryStore.setQuery(shipmentModifier('order-1'), 'loading', undefined);

      const {useFormCapabilities} = await import('./useFormCapabilities');

      expect(useFormCapabilities().getCarrierForShipment(formStub('POSTNL'))).toEqual(order);
    });

    it('returns undefined when the shipment query is success but the chosen carrier is not in the results (invalid combo)', async () => {
      queryStore.setQuery(shipmentModifier('order-1'), 'success', [buildCarrier({carrier: 'DPD'})]);

      const {useFormCapabilities} = await import('./useFormCapabilities');

      expect(useFormCapabilities().getCarrierForShipment(formStub('POSTNL'))).toBeUndefined();
    });
  });

  describe('hasShipmentOption', () => {
    it('returns true when the shipment carrier exposes the option', async () => {
      const shipment = buildCarrier({
        carrier: 'POSTNL',
        options: {requiresSignature: {} as never},
      });
      queryStore.setQuery(shipmentModifier('order-1'), 'success', [shipment]);

      const {useFormCapabilities} = await import('./useFormCapabilities');

      expect(useFormCapabilities().hasShipmentOption(formStub('POSTNL'), 'requiresSignature')).toBe(true);
    });

    it('returns false when the option is absent from the carrier', async () => {
      const shipment = buildCarrier({carrier: 'POSTNL', options: {}});
      queryStore.setQuery(shipmentModifier('order-1'), 'success', [shipment]);

      const {useFormCapabilities} = await import('./useFormCapabilities');

      expect(useFormCapabilities().hasShipmentOption(formStub('POSTNL'), 'requiresSignature')).toBe(false);
    });
  });

  describe('getInsuranceOptions', () => {
    const formatter = {format: (_: unknown, n: number) => `€${n}`} as never;

    it('returns [] when max insurance amount is zero', async () => {
      const shipment = buildCarrier({
        carrier: 'POSTNL',
        options: {
          insurance: {
            insuredAmount: {
              min: {amount: 0, currency: 'EUR'},
              max: {amount: 0, currency: 'EUR'},
              default: {amount: 0, currency: 'EUR'},
            },
          } as never,
        },
      });
      queryStore.setQuery(shipmentModifier('order-1'), 'success', [shipment]);

      const {useFormCapabilities} = await import('./useFormCapabilities');

      expect(useFormCapabilities().getInsuranceOptions(formStub('POSTNL'), formatter)).toEqual([]);
    });

    it('switches step from 250 to 500 across the 500€ threshold', async () => {
      const shipment = buildCarrier({
        carrier: 'POSTNL',
        options: {
          insurance: {
            insuredAmount: {
              min: {amount: 0, currency: 'EUR'},
              // max is 1000€ in cents
              max: {amount: 100_000, currency: 'EUR'},
              default: {amount: 0, currency: 'EUR'},
            },
          } as never,
        },
      });
      queryStore.setQuery(shipmentModifier('order-1'), 'success', [shipment]);

      const {useFormCapabilities} = await import('./useFormCapabilities');
      const opts = useFormCapabilities().getInsuranceOptions(formStub('POSTNL'), formatter);
      const values = opts.map((o) => o.value);

      // First entry is the inherit default; subsequent values are cent amounts as strings.
      expect(values[0]).toBe(TriState.Inherit);
      // 0, 250, 500 (low steps) — then 1000 (high step from 500). Exact sequence verifies
      // the boundary semantics — replacing `<` with `<=` on LOW_THRESHOLD would shift these.
      expect(values.slice(1)).toEqual(['0', '25000', '50000', '100000']);
    });
  });
});
