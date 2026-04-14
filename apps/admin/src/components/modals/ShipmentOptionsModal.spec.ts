// @vitest-environment happy-dom

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {config, mount} from '@vue/test-utils';
import {defineComponent, h} from 'vue';
import {AdminAction, OrderMode} from '../../data';
import {doComponentTestSetup, doComponentTestTeardown} from '../../__tests__';
import ShipmentOptionsModal from './ShipmentOptionsModal.vue';

vi.mock('../../composables/context/useOrderMode', () => ({
  useOrderMode: vi.fn(),
}));

vi.mock('../../composables/orders/useOrdersData', () => ({
  useOrdersData: vi.fn(() => []),
}));

// eslint-disable-next-line import/first
import {useOrderMode} from '../../composables/context/useOrderMode';

const mockedUseOrderMode = vi.mocked(useOrderMode);

const MODAL_CLOSE_ID = 'modal_close';

// eslint-disable-next-line @typescript-eslint/naming-convention
const PdkModalStub = defineComponent({
  name: 'PdkModal',
  props: {actions: Array, modalKey: String, title: String},
  render() {
    return h('div');
  },
});

const getActionIds = (wrapper: ReturnType<typeof mount>): string[] => {
  const modal = wrapper.findComponent(PdkModalStub);
  const actions = modal.props('actions') as Array<{id: string}>;

  return actions.map((a) => a.id);
};

describe('ShipmentOptionsModal', () => {
  beforeEach(() => {
    doComponentTestSetup();
    config.global.stubs.PdkModal = PdkModalStub as any;
  });

  afterEach(() => {
    doComponentTestTeardown();
    vi.restoreAllMocks();
  });

  it('shows close, update, export-to-shipments, and export-print in Shipments mode', () => {
    mockedUseOrderMode.mockReturnValue(OrderMode.Shipments);
    const wrapper = mount(ShipmentOptionsModal);
    const ids = getActionIds(wrapper);

    expect(ids).toContain(MODAL_CLOSE_ID);
    expect(ids).toContain(AdminAction.OrdersUpdate);
    expect(ids).toContain(AdminAction.OrdersExport);
    expect(ids).toContain(AdminAction.OrdersExportPrint);
  });

  it('shows close, update, and export in OrderV1 mode', () => {
    mockedUseOrderMode.mockReturnValue(OrderMode.OrderV1);
    const wrapper = mount(ShipmentOptionsModal);
    const ids = getActionIds(wrapper);

    expect(ids).toContain(MODAL_CLOSE_ID);
    expect(ids).toContain(AdminAction.OrdersUpdate);
    expect(ids).toContain(AdminAction.OrdersExport);
    expect(ids).not.toContain(AdminAction.OrdersExportPrint);
  });

  it('shows only close and update in OrderV2 mode', () => {
    mockedUseOrderMode.mockReturnValue(OrderMode.OrderV2);
    const wrapper = mount(ShipmentOptionsModal);
    const ids = getActionIds(wrapper);

    expect(ids).toEqual([MODAL_CLOSE_ID, AdminAction.OrdersUpdate]);
  });
});
