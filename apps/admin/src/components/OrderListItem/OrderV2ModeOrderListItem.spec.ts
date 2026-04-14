// @vitest-environment happy-dom

import {computed, defineComponent, h, ref} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {config, mount} from '@vue/test-utils';
import {AdminAction} from '../../data';
import {doComponentTestSetup, doComponentTestTeardown} from '../../__tests__';
import OrderV2ModeOrderListItem from './OrderV2ModeOrderListItem.vue';

vi.mock('../../composables/orders/useOrderData', () => ({
  useOrderData: vi.fn(),
}));

// eslint-disable-next-line import/first
import {useOrderData} from '../../composables/orders/useOrderData';

const mockedUseOrderData = vi.mocked(useOrderData);

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentLabelStub = defineComponent({
  name: 'ShipmentLabel',
  props: {shipmentId: Number},
  render() {
    return h('div', {class: 'shipment-label'}, `Shipment #${this.shipmentId}`);
  },
});

const mockOrderData = (shipments: {id: number; deleted?: boolean}[] = []) => {
  const orderData = {externalIdentifier: 'TEST-1', exported: false, shipments};

  mockedUseOrderData.mockReturnValue({
    order: computed(() => orderData),
    loading: computed(() => false),
    query: {data: ref(orderData), isLoading: ref(false)} as any,
  });
};

describe('OrderV2ModeOrderListItem', () => {
  beforeEach(() => {
    doComponentTestSetup();
    config.global.stubs.ShipmentLabel = ShipmentLabelStub as any;
  });

  afterEach(() => {
    doComponentTestTeardown();
    vi.restoreAllMocks();
  });

  it('shows only the edit action', () => {
    mockOrderData();
    const wrapper = mount(OrderV2ModeOrderListItem);
    const html = wrapper.html();

    expect(html).toContain(AdminAction.OrdersEdit);
  });

  it('shows DeliveryOptionsExcerpt when there are no shipments', () => {
    mockOrderData([]);
    const wrapper = mount(OrderV2ModeOrderListItem);

    expect(wrapper.findComponent({name: 'DeliveryOptionsExcerpt'}).exists()).toBe(true);
  });

  it('renders a ShipmentLabel for each shipment', () => {
    mockOrderData([{id: 1}, {id: 2}, {id: 3}]);
    const wrapper = mount(OrderV2ModeOrderListItem);
    const labels = wrapper.findAllComponents(ShipmentLabelStub);

    expect(labels).toHaveLength(3);
  });

  it('does not show export, print, or backoffice actions', () => {
    mockOrderData();
    const wrapper = mount(OrderV2ModeOrderListItem);
    const html = wrapper.html();

    expect(html).not.toContain(AdminAction.OrdersExport);
    expect(html).not.toContain(AdminAction.OrdersPrint);
    expect(html).not.toContain(AdminAction.OrdersExportPrint);
    expect(html).not.toContain('show-exported-order');
  });
});