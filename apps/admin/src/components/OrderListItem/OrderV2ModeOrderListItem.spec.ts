// @vitest-environment happy-dom

import {defineComponent, h} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {config, mount} from '@vue/test-utils';
import {AdminAction} from '../../data';
import {useOrderData} from '../../composables/orders/useOrderData';
import {ORDER_VIEW_IN_BACKOFFICE_ID} from '../../actions';
import {mockOrderData} from '../../__tests__/utils/mockOrderData';
import {doComponentTestSetup, doComponentTestTeardown} from '../../__tests__';
import OrderV2ModeOrderListItem from './OrderV2ModeOrderListItem.vue';

vi.mock('../../composables/orders/useOrderData', () => ({
  useOrderData: vi.fn(),
}));

const mockedUseOrderData = vi.mocked(useOrderData);

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentLabelStub = defineComponent({
  name: 'ShipmentLabel',
  props: {shipmentId: Number},
  render() {
    return h('div', {class: 'shipment-label'}, `Shipment #${this.shipmentId}`);
  },
});

describe('OrderV2ModeOrderListItem', () => {
  beforeEach(() => {
    doComponentTestSetup();
    config.global.stubs.ShipmentLabel = ShipmentLabelStub as any;
  });

  afterEach(() => {
    doComponentTestTeardown();
  });

  it('shows only the edit action', () => {
    mockOrderData(mockedUseOrderData);
    const wrapper = mount(OrderV2ModeOrderListItem);
    const html = wrapper.html();

    expect(html).toContain(AdminAction.OrdersEdit);
  });

  it('shows DeliveryOptionsExcerpt when there are no shipments', () => {
    mockOrderData(mockedUseOrderData, {shipments: []});
    const wrapper = mount(OrderV2ModeOrderListItem);

    expect(wrapper.findComponent({name: 'DeliveryOptionsExcerpt'}).exists()).toBe(true);
  });

  it('renders a ShipmentLabel for each shipment', () => {
    mockOrderData(mockedUseOrderData, {shipments: [{id: 1}, {id: 2}, {id: 3}]});
    const wrapper = mount(OrderV2ModeOrderListItem);
    const labels = wrapper.findAllComponents(ShipmentLabelStub);

    expect(labels).toHaveLength(3);
  });

  it('does not show export, print, or backoffice actions', () => {
    mockOrderData(mockedUseOrderData);
    const wrapper = mount(OrderV2ModeOrderListItem);
    const html = wrapper.html();

    expect(html).not.toContain(AdminAction.OrdersExport);
    expect(html).not.toContain(AdminAction.OrdersPrint);
    expect(html).not.toContain(AdminAction.OrdersExportPrint);
    expect(html).not.toContain(ORDER_VIEW_IN_BACKOFFICE_ID);
  });
});
