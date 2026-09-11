// @vitest-environment happy-dom

import {defineComponent, h, KeepAlive} from 'vue';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {config, mount} from '@vue/test-utils';
import {useFormBuilder} from '@myparcel-dev/vue-form-builder';
import {useActionStore, useModalStore, useNotificationStore, useQueryStore} from '../../stores';
import {AdminAction, OrderMode} from '../../data';
import {useOrderMode} from '../../composables/context/useOrderMode';
import PrintOptionsModal from '../../components/modals/PrintOptionsModal.vue';
import {mockDefaultPrintOptionsView} from '../../__tests__/mocks/mockDefaultPrintOptionsView';
import {mockDefaultPluginSettings} from '../../__tests__/mocks/mockDefaultPluginSettings';
import {doComponentTestSetup, doComponentTestTeardown} from '../../__tests__';

const printOrders = vi.fn();
const updateShipments = vi.fn();
const fetchOrders = vi.fn();
const fetchContext = vi.fn();

vi.mock('../../sdk', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../sdk')>();

  return {...actual, usePdkAdminApi: () => ({printOrders, updateShipments, fetchOrders, fetchContext})};
});

vi.mock('../../composables/context/useOrderMode', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../composables/context/useOrderMode')>();

  return {...actual, useOrderMode: vi.fn()};
});

/** Mirrors WcModal and Bootstrap4Modal: the modal builds a new form on every open. */
// eslint-disable-next-line @typescript-eslint/naming-convention
const RebuildingModalStub = defineComponent({
  name: 'RebuildingModalStub',
  props: {actions: {type: Array, default: () => []}, modalKey: {type: String, default: null}, title: String},
  setup(props, {slots}) {
    const modalStore = useModalStore();

    return () => {
      const isOpen = props.modalKey && modalStore.opened === props.modalKey;

      return h('div', isOpen ? [h(KeepAlive, () => slots.default?.({context: modalStore.context}))] : []);
    };
  },
});

/** Mirrors DefaultModal, which hides its content instead of unmounting it, so one form is reused. */
// eslint-disable-next-line @typescript-eslint/naming-convention
const ReusingModalStub = defineComponent({
  name: 'ReusingModalStub',
  props: {actions: {type: Array, default: () => []}, modalKey: {type: String, default: null}, title: String},
  setup(props, {slots}) {
    const modalStore = useModalStore();

    return () => h('div', [slots.default?.({context: modalStore.context})]);
  },
});

const ORDER_A = 'ORDER-A';
const ORDER_B = 'ORDER-B';

// eslint-disable-next-line @typescript-eslint/naming-convention
const RowHost = defineComponent({
  setup() {
    const queryStore = useQueryStore();
    const actionStore = useActionStore();

    queryStore.registerContextQueries();
    queryStore.registerOrderQueries(ORDER_A);
    queryStore.registerOrderQueries(ORDER_B);
    actionStore.registerOrderActions();

    return () => h('div');
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalsHost = defineComponent({
  setup() {
    useQueryStore().registerContextQueries();
    useActionStore().registerModalActions();

    return () => h(PrintOptionsModal);
  },
});

const mountApp = (): void => {
  mount(ModalsHost);
  mount(RowHost);
};

/** Press print on one order, fill in the modal and submit it. */
const printOne = async (orderId: string): Promise<void> => {
  const actionStore = useActionStore();
  const modalStore = useModalStore();

  const action = actionStore.dispatch(AdminAction.OrdersPrint, {orderIds: orderId} as never);

  await vi.waitFor(() => expect(modalStore.context?.form).toBeTruthy());

  await actionStore.dispatch('modal_submit');
  await vi.waitFor(() => expect(modalStore.opened).toBeNull());
  await action;
};

describe('waitForLabelPrompt', () => {
  beforeEach(() => {
    // The form registry is module-level, so a form built by the previous test would still be
    // there when this one starts.
    useFormBuilder().forms.value = {};

    // One real field, so the form has values to submit and the merge into the print parameters
    // is actually exercised.
    vi.mocked(mockDefaultPrintOptionsView).mockReturnValue({
      id: 'print-options',
      children: [],
      description: '',
      subtext: '',
      title: '',
      elements: [{name: 'format', label: 'label_format', $component: 'TextInput'}],
    } as never);

    vi.mocked(mockDefaultPluginSettings).mockReturnValue({
      label: {prompt: true, format: 'a4', output: 'download', position: [1, 2, 3, 4]},
      order: {},
    } as never);

    doComponentTestSetup();
    config.global.stubs.PdkModal = RebuildingModalStub as never;

    vi.mocked(useOrderMode).mockReturnValue({value: OrderMode.Shipments} as never);
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);

    printOrders.mockReset().mockResolvedValue({url: 'https://example.test/label.pdf'});
    updateShipments.mockReset().mockResolvedValue([]);
    fetchOrders.mockResolvedValue([{externalIdentifier: ORDER_A, shipments: [{id: 1}]}]);
    fetchContext.mockResolvedValue([{}]);
  });

  afterEach(() => {
    doComponentTestTeardown();
  });

  it('prints on every press, not only the first of the page', async () => {
    mountApp();

    await printOne(ORDER_A);
    await printOne(ORDER_B);
    await printOne(ORDER_A);

    expect(printOrders).toHaveBeenCalledTimes(3);
    expect(useNotificationStore().notifications).toHaveLength(0);
  });

  it('prints on every press when the modal reuses one form across opens', async () => {
    config.global.stubs.PdkModal = ReusingModalStub as never;

    mountApp();

    await printOne(ORDER_A);
    await printOne(ORDER_B);

    expect(printOrders).toHaveBeenCalledTimes(2);
  });

  it('cancels silently when the modal is closed without submitting', async () => {
    mountApp();

    const actionStore = useActionStore();
    const modalStore = useModalStore();

    const action = actionStore.dispatch(AdminAction.OrdersPrint, {orderIds: ORDER_A} as never);

    await vi.waitFor(() => expect(modalStore.context?.form).toBeTruthy());
    modalStore.close();
    await action;

    expect(printOrders).not.toHaveBeenCalled();
    expect(useNotificationStore().notifications).toHaveLength(0);
  });

  it('prints after a cancelled print', async () => {
    mountApp();

    const actionStore = useActionStore();
    const modalStore = useModalStore();

    const cancelled = actionStore.dispatch(AdminAction.OrdersPrint, {orderIds: ORDER_A} as never);

    await vi.waitFor(() => expect(modalStore.context?.form).toBeTruthy());
    modalStore.close();
    await cancelled;

    await printOne(ORDER_A);

    expect(printOrders).toHaveBeenCalledTimes(1);
  });

  it('prints with the options the merchant picked in the modal', async () => {
    mountApp();

    const actionStore = useActionStore();
    const modalStore = useModalStore();

    const action = actionStore.dispatch(AdminAction.OrdersPrint, {orderIds: ORDER_A} as never);

    await vi.waitFor(() => expect(modalStore.context?.form).toBeTruthy());

    modalStore.context?.form?.setValues({format: 'a6'});

    await actionStore.dispatch('modal_submit');
    await vi.waitFor(() => expect(modalStore.opened).toBeNull());
    await action;

    expect(printOrders).toHaveBeenCalledWith(
      expect.objectContaining({parameters: expect.objectContaining({format: 'a6'})}),
    );
  });
});
