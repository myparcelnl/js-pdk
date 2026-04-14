// @vitest-environment happy-dom

import {computed, defineComponent, h, ref} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {config, mount} from '@vue/test-utils';
import {AdminAction, OrderMode} from '../../data';
import {useOrderData} from '../../composables/orders/useOrderData';
import {useOrderMode} from '../../composables/context/useOrderMode';
import {getActionIds} from '../../__tests__/utils/getActionIds';
import {doComponentTestSetup, doComponentTestTeardown} from '../../__tests__';
import ShipmentOptionsBox from './ShipmentOptionsBox.vue';

vi.mock('../../composables/context/useOrderMode', () => ({
  useOrderMode: vi.fn(),
}));

vi.mock('../../composables/orders/useOrderData', () => ({
  useOrderData: vi.fn(),
}));

vi.mock('../../composables/language/useLanguage', () => ({
  useLanguage: vi.fn(() => ({
    translate: (key: string) => key,
  })),
}));

const mockedUseOrderMode = vi.mocked(useOrderMode);
const mockedUseOrderData = vi.mocked(useOrderData);

const BACKOFFICE_ACTION_ID = 'show-exported-order';

// eslint-disable-next-line @typescript-eslint/naming-convention
const PdkConceptBoxWrapperStub = defineComponent({
  name: 'PdkConceptBoxWrapper',
  props: {actions: Array, loading: Boolean},
  render() {
    return h('div', this.$slots.default?.());
  },
});

const mockOrderData = (exported = false) => {
  const orderData = {externalIdentifier: 'TEST-1', exported, shipments: []};

  mockedUseOrderData.mockReturnValue({
    order: computed(() => orderData),
    loading: computed(() => false),
    query: {data: ref(orderData), isLoading: ref(false)} as any,
  });
};

const getBoxActionIds = (wrapper: ReturnType<typeof mount>) => getActionIds(wrapper, PdkConceptBoxWrapperStub);

describe('ShipmentOptionsBox', () => {
  beforeEach(() => {
    doComponentTestSetup();
    config.global.stubs.PdkConceptBoxWrapper = PdkConceptBoxWrapperStub as any;
  });

  afterEach(() => {
    doComponentTestTeardown();
    vi.restoreAllMocks();
  });

  it('shows update, export-to-shipments, print, and export-print in Shipments mode', () => {
    mockedUseOrderMode.mockReturnValue(OrderMode.Shipments);
    mockOrderData();
    const wrapper = mount(ShipmentOptionsBox);
    const ids = getBoxActionIds(wrapper);

    expect(ids).toContain(AdminAction.OrdersUpdate);
    expect(ids).toContain(AdminAction.OrdersExport);
    expect(ids).toContain(AdminAction.OrdersPrint);
    expect(ids).toContain(AdminAction.OrdersExportPrint);
    expect(ids).not.toContain(BACKOFFICE_ACTION_ID);
  });

  it('shows update and export in OrderV1 mode (not exported)', () => {
    mockedUseOrderMode.mockReturnValue(OrderMode.OrderV1);
    mockOrderData(false);
    const wrapper = mount(ShipmentOptionsBox);
    const ids = getBoxActionIds(wrapper);

    expect(ids).toContain(AdminAction.OrdersUpdate);
    expect(ids).toContain(AdminAction.OrdersExport);
    expect(ids).not.toContain(AdminAction.OrdersPrint);
    expect(ids).not.toContain(AdminAction.OrdersExportPrint);
  });

  it('shows backoffice link in OrderV1 mode when exported', () => {
    mockedUseOrderMode.mockReturnValue(OrderMode.OrderV1);
    mockOrderData(true);
    const wrapper = mount(ShipmentOptionsBox);
    const ids = getBoxActionIds(wrapper);

    expect(ids).toEqual([BACKOFFICE_ACTION_ID]);
  });

  it('shows only update in OrderV2 mode', () => {
    mockedUseOrderMode.mockReturnValue(OrderMode.OrderV2);
    mockOrderData();
    const wrapper = mount(ShipmentOptionsBox);
    const ids = getBoxActionIds(wrapper);

    expect(ids).toEqual([AdminAction.OrdersUpdate]);
  });

  it('never shows exported state in OrderV2 mode even if order has exported flag', () => {
    mockedUseOrderMode.mockReturnValue(OrderMode.OrderV2);
    mockOrderData(true);
    const wrapper = mount(ShipmentOptionsBox);
    const ids = getBoxActionIds(wrapper);

    expect(ids).toEqual([AdminAction.OrdersUpdate]);
    expect(ids).not.toContain(BACKOFFICE_ACTION_ID);
  });
});
