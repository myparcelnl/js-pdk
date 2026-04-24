// @vitest-environment happy-dom

import {computed, defineComponent, h} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {config, mount} from '@vue/test-utils';
import {AdminAction, OrderMode} from '../../data';
import {useOrderMode} from '../../composables/context/useOrderMode';
import {getActionIds} from '../../__tests__/utils/getActionIds';
import {doComponentTestSetup, doComponentTestTeardown} from '../../__tests__';
import ShipmentOptionsModal from './ShipmentOptionsModal.vue';

vi.mock('../../composables/context/useOrderMode', () => ({
  useOrderMode: vi.fn(),
}));

vi.mock('../../composables/orders/useOrdersData', () => ({
  useOrdersData: vi.fn(() => []),
}));

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

const getModalActionIds = (wrapper: ReturnType<typeof mount>) => getActionIds(wrapper, PdkModalStub);

describe('ShipmentOptionsModal', () => {
  beforeEach(() => {
    doComponentTestSetup();
    config.global.stubs.PdkModal = PdkModalStub as any;
  });

  afterEach(() => {
    doComponentTestTeardown();
  });

  it('shows close, update, export-to-shipments, and export-print in Shipments mode', () => {
    mockedUseOrderMode.mockReturnValue(computed(() => OrderMode.Shipments));
    const wrapper = mount(ShipmentOptionsModal);
    const ids = getModalActionIds(wrapper);

    expect(ids).toContain(MODAL_CLOSE_ID);
    expect(ids).toContain(AdminAction.OrdersUpdate);
    expect(ids).toContain(AdminAction.OrdersExport);
    expect(ids).toContain(AdminAction.OrdersExportPrint);
  });

  it('shows close, update, and export in OrderV1 mode', () => {
    mockedUseOrderMode.mockReturnValue(computed(() => OrderMode.OrderV1));
    const wrapper = mount(ShipmentOptionsModal);
    const ids = getModalActionIds(wrapper);

    expect(ids).toContain(MODAL_CLOSE_ID);
    expect(ids).toContain(AdminAction.OrdersUpdate);
    expect(ids).toContain(AdminAction.OrdersExport);
    expect(ids).not.toContain(AdminAction.OrdersExportPrint);
  });

  it('shows only close and update in OrderV2 mode', () => {
    mockedUseOrderMode.mockReturnValue(computed(() => OrderMode.OrderV2));
    const wrapper = mount(ShipmentOptionsModal);
    const ids = getModalActionIds(wrapper);

    expect(ids).toEqual([MODAL_CLOSE_ID, AdminAction.OrdersUpdate]);
  });
});
