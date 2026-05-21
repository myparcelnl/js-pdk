// @vitest-environment happy-dom

import {computed, defineComponent, h} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {config, mount} from '@vue/test-utils';
import {AdminAction, OrderMode} from '../../data';
import {useOrderMode} from '../../composables/context/useOrderMode';
import {useOrderData} from '../../composables/orders/useOrderData';
import {ORDER_VIEW_IN_BACKOFFICE_ID} from '../../actions';
import {mockOrderData} from '../../__tests__/utils/mockOrderData';
import {doComponentTestSetup, doComponentTestTeardown} from '../../__tests__';
import OrderModeOrderListItem from './OrderModeOrderListItem.vue';

vi.mock('../../composables/orders/useOrderData', () => ({
  useOrderData: vi.fn(),
}));

vi.mock('../../composables/context/useOrderMode', () => ({
  useOrderMode: vi.fn(),
}));

const mockedUseOrderData = vi.mocked(useOrderData);
const mockedUseOrderMode = vi.mocked(useOrderMode);

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentLabelStub = defineComponent({
  name: 'ShipmentLabel',
  props: {shipmentId: Number},
  render() {
    return h('div', {class: 'shipment-label'}, `Shipment #${this.shipmentId}`);
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const PdkLinkStub = defineComponent({
  name: 'PdkLink',
  props: {action: {type: Object, required: true}},
  render() {
    return h('a', {'data-action-id': (this.action as {id?: string})?.id}, 'PdkLink');
  },
});

describe('OrderModeOrderListItem', () => {
  beforeEach(() => {
    doComponentTestSetup();
    config.global.stubs.ShipmentLabel = ShipmentLabelStub as any;
    config.global.stubs.PdkLink = PdkLinkStub as any;
  });

  afterEach(() => {
    doComponentTestTeardown();
  });

  describe('OrderV1 mode', () => {
    beforeEach(() => {
      mockedUseOrderMode.mockReturnValue(computed(() => OrderMode.OrderV1));
    });

    it('shows edit and export actions when the order is not exported', () => {
      mockOrderData(mockedUseOrderData);
      const wrapper = mount(OrderModeOrderListItem);
      const html = wrapper.html();

      expect(html).toContain(AdminAction.OrdersEdit);
      expect(html).toContain(AdminAction.OrdersExport);
      expect(html).not.toContain(ORDER_VIEW_IN_BACKOFFICE_ID);
    });

    it('shows only the backoffice link when the order is exported', () => {
      mockOrderData(mockedUseOrderData, {exported: true});
      const wrapper = mount(OrderModeOrderListItem);
      const pdkLink = wrapper.findComponent(PdkLinkStub);
      const html = wrapper.html();

      expect(pdkLink.exists()).toBe(true);
      expect(html).toContain(`data-action-id="${ORDER_VIEW_IN_BACKOFFICE_ID}"`);
      expect(html).not.toContain(AdminAction.OrdersEdit);
      expect(html).not.toContain(AdminAction.OrdersExport);
    });
  });

  describe('OrderV2 mode', () => {
    beforeEach(() => {
      mockedUseOrderMode.mockReturnValue(computed(() => OrderMode.OrderV2));
    });

    it('shows the edit action and the shipment-export action (hybrid)', () => {
      mockOrderData(mockedUseOrderData);
      const wrapper = mount(OrderModeOrderListItem);
      const html = wrapper.html();

      expect(html).toContain(AdminAction.OrdersEdit);
      expect(html).toContain(AdminAction.OrdersExport);
    });

    it('does not show the V1 backoffice link, even when the order is exported', () => {
      mockOrderData(mockedUseOrderData, {exported: true});
      const wrapper = mount(OrderModeOrderListItem);
      const html = wrapper.html();

      expect(html).not.toContain(ORDER_VIEW_IN_BACKOFFICE_ID);
    });
  });

  describe('structural rendering', () => {
    beforeEach(() => {
      mockedUseOrderMode.mockReturnValue(computed(() => OrderMode.OrderV2));
    });

    it('shows DeliveryOptionsExcerpt when there are no shipments', () => {
      mockOrderData(mockedUseOrderData, {shipments: []});
      const wrapper = mount(OrderModeOrderListItem);

      expect(wrapper.findComponent({name: 'DeliveryOptionsExcerpt'}).exists()).toBe(true);
    });

    it('renders a ShipmentLabel for each shipment', () => {
      mockOrderData(mockedUseOrderData, {shipments: [{id: 1}, {id: 2}, {id: 3}]});
      const wrapper = mount(OrderModeOrderListItem);
      const labels = wrapper.findAllComponents(ShipmentLabelStub);

      expect(labels).toHaveLength(3);
    });
  });
});
