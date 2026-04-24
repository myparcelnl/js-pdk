// @vitest-environment happy-dom

import {computed, defineComponent, h} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {config, mount} from '@vue/test-utils';
import {AdminAction, OrderMode} from '../../data';
import {useOrderData} from '../../composables/orders/useOrderData';
import {useOrderMode} from '../../composables/context/useOrderMode';
import {ORDER_VIEW_IN_BACKOFFICE_ID} from '../../actions';
import {mockOrderData} from '../../__tests__/utils/mockOrderData';
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

// eslint-disable-next-line @typescript-eslint/naming-convention
const PdkConceptBoxWrapperStub = defineComponent({
  name: 'PdkConceptBoxWrapper',
  props: {actions: Array, loading: Boolean},
  render() {
    return h('div', this.$slots.default?.());
  },
});

const getBoxActionIds = (wrapper: ReturnType<typeof mount>) => getActionIds(wrapper, PdkConceptBoxWrapperStub);

describe('ShipmentOptionsBox', () => {
  beforeEach(() => {
    doComponentTestSetup();
    config.global.stubs.PdkConceptBoxWrapper = PdkConceptBoxWrapperStub as any;
  });

  afterEach(() => {
    doComponentTestTeardown();
  });

  it('shows update, export-to-shipments, print, and export-print in Shipments mode', () => {
    mockedUseOrderMode.mockReturnValue(computed(() => OrderMode.Shipments));
    mockOrderData(mockedUseOrderData);
    const wrapper = mount(ShipmentOptionsBox);
    const ids = getBoxActionIds(wrapper);

    expect(ids).toContain(AdminAction.OrdersUpdate);
    expect(ids).toContain(AdminAction.OrdersExport);
    expect(ids).toContain(AdminAction.OrdersPrint);
    expect(ids).toContain(AdminAction.OrdersExportPrint);
    expect(ids).not.toContain(ORDER_VIEW_IN_BACKOFFICE_ID);
  });

  it('shows update and export in OrderV1 mode (not exported)', () => {
    mockedUseOrderMode.mockReturnValue(computed(() => OrderMode.OrderV1));
    mockOrderData(mockedUseOrderData);
    const wrapper = mount(ShipmentOptionsBox);
    const ids = getBoxActionIds(wrapper);

    expect(ids).toContain(AdminAction.OrdersUpdate);
    expect(ids).toContain(AdminAction.OrdersExport);
    expect(ids).not.toContain(AdminAction.OrdersPrint);
    expect(ids).not.toContain(AdminAction.OrdersExportPrint);
  });

  it('shows backoffice link in OrderV1 mode when exported', () => {
    mockedUseOrderMode.mockReturnValue(computed(() => OrderMode.OrderV1));
    mockOrderData(mockedUseOrderData, {exported: true});
    const wrapper = mount(ShipmentOptionsBox);
    const ids = getBoxActionIds(wrapper);

    expect(ids).toEqual([ORDER_VIEW_IN_BACKOFFICE_ID]);
  });

  it('shows only update in OrderV2 mode', () => {
    mockedUseOrderMode.mockReturnValue(computed(() => OrderMode.OrderV2));
    mockOrderData(mockedUseOrderData);
    const wrapper = mount(ShipmentOptionsBox);
    const ids = getBoxActionIds(wrapper);

    expect(ids).toEqual([AdminAction.OrdersUpdate]);
  });

  it('never shows exported state in OrderV2 mode even if order has exported flag', () => {
    mockedUseOrderMode.mockReturnValue(computed(() => OrderMode.OrderV2));
    mockOrderData(mockedUseOrderData, {exported: true});
    const wrapper = mount(ShipmentOptionsBox);
    const ids = getBoxActionIds(wrapper);

    expect(ids).toEqual([AdminAction.OrdersUpdate]);
    expect(ids).not.toContain(ORDER_VIEW_IN_BACKOFFICE_ID);
  });
});
