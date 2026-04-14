// @vitest-environment happy-dom

import {defineComponent, h} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import {AdminAction, OrderMode} from '../data';
import {doComponentTestSetup, doComponentTestTeardown} from '../__tests__';
import {useActionStore} from './useActionStore';

vi.mock('../composables/context/useOrderMode', () => ({
  useOrderMode: vi.fn(),
}));

// eslint-disable-next-line import/first
import {useOrderMode} from '../composables/context/useOrderMode';

const mockedUseOrderMode = vi.mocked(useOrderMode);

const BACKOFFICE_ACTION_ID = 'show-exported-order';

describe('useActionStore', () => {
  beforeEach(() => {
    doComponentTestSetup();
  });

  afterEach(() => {
    doComponentTestTeardown();
    vi.restoreAllMocks();
  });

  describe('registerOrderActions', () => {
    const mountWithStore = (mode: OrderMode) => {
      mockedUseOrderMode.mockReturnValue(mode);

      let store!: ReturnType<typeof useActionStore>;

      mount(
        defineComponent({
          setup() {
            store = useActionStore();
            store.registerOrderActions();

            return () => h('div');
          },
        }),
      );

      return store;
    };

    const commonActions = [AdminAction.OrdersEdit, AdminAction.OrdersFetch, AdminAction.OrdersUpdate];

    it.each(commonActions)('registers common action %s regardless of mode', (action) => {
      for (const mode of [OrderMode.Shipments, OrderMode.OrderV1, OrderMode.OrderV2]) {
        const store = mountWithStore(mode);
        expect(store.get(action), `${action} should be registered in ${mode} mode`).toBeDefined();
      }
    });

    it('registers shipment-specific actions in Shipments mode', () => {
      const store = mountWithStore(OrderMode.Shipments);

      expect(store.get(AdminAction.OrdersPrint)).toBeDefined();
      expect(store.get(AdminAction.OrdersExport)).toBeDefined();
      expect(store.get(AdminAction.OrdersExportPrint)).toBeDefined();
      expect(store.get(AdminAction.ShipmentsExportReturn)).toBeDefined();
      expect(store.get(AdminAction.ShipmentsDelete)).toBeDefined();
      expect(store.get(AdminAction.ShipmentsUpdate)).toBeDefined();
      expect(store.get(AdminAction.ShipmentsPrint)).toBeDefined();
      expect(store.get(BACKOFFICE_ACTION_ID)).toBeUndefined();
    });

    it('registers order export and backoffice actions in OrderV1 mode', () => {
      const store = mountWithStore(OrderMode.OrderV1);

      expect(store.get(AdminAction.OrdersExport)).toBeDefined();
      expect(store.get(BACKOFFICE_ACTION_ID)).toBeDefined();
      expect(store.get(AdminAction.OrdersExportPrint)).toBeUndefined();
      expect(store.get(AdminAction.ShipmentsExportReturn)).toBeUndefined();
      expect(store.get(AdminAction.ShipmentsDelete)).toBeUndefined();
      expect(store.get(AdminAction.ShipmentsUpdate)).toBeUndefined();
      expect(store.get(AdminAction.ShipmentsPrint)).toBeUndefined();
    });

    it('registers no export or print actions in OrderV2 mode', () => {
      const store = mountWithStore(OrderMode.OrderV2);

      expect(store.get(AdminAction.OrdersPrint)).toBeUndefined();
      expect(store.get(AdminAction.OrdersExport)).toBeUndefined();
      expect(store.get(AdminAction.OrdersExportPrint)).toBeUndefined();
      expect(store.get(BACKOFFICE_ACTION_ID)).toBeUndefined();
      expect(store.get(AdminAction.ShipmentsExportReturn)).toBeUndefined();
      expect(store.get(AdminAction.ShipmentsDelete)).toBeUndefined();
      expect(store.get(AdminAction.ShipmentsUpdate)).toBeUndefined();
      expect(store.get(AdminAction.ShipmentsPrint)).toBeUndefined();
    });

    it('registers shipmentsExportReturn exactly once in Shipments mode', () => {
      const store = mountWithStore(OrderMode.Shipments);

      expect(store.get(AdminAction.ShipmentsExportReturn)).toBeDefined();
    });
  });
});
