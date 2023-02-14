import {ActionParameters, AdminAction, AdminIcon, ModalKey} from '../../types';
import {
  ActionContext,
  createMutator,
  createQueryFetcher,
  executeNextAction,
  resolveOrderParameters,
} from '../executors';
import {openOrPrint, waitForLabelPrompt} from '../print';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {defineAction} from '../defineAction';
import {shipmentsFetchAction} from './shipments';
import {useModalStore} from '../../stores';

/**
 * Open modal to edit order shipment options.
 */
export const ordersEditAction = defineAction({
  id: 'editOrder',
  icon: AdminIcon.EDIT,
  label: 'action_edit',
  handler(context: ActionContext) {
    const modalStore = useModalStore();
    const parameters = context.parameters as ActionParameters<AdminAction.ORDERS_EXPORT>;

    modalStore.open(ModalKey.SHIPMENT_OPTIONS, parameters.orderIds.toString());
  },
});

/**
 * Shown only in order mode. Exports entire order.
 */
export const orderExportAction = defineAction({
  name: AdminAction.ORDERS_EXPORT,
  icon: AdminIcon.EXPORT,
  label: 'action_export',
  beforeHandle: resolveOrderParameters,
  handler: createMutator(BackendEndpoint.EXPORT_ORDERS),
});

/**
 * Shown if not in order mode. Exports shipments.
 */
export const orderExportToShipmentsAction = defineAction({
  name: AdminAction.ORDERS_EXPORT,
  icon: AdminIcon.EXPORT,
  label: 'action_export_shipments',
  beforeHandle: resolveOrderParameters,
  handler: createMutator(BackendEndpoint.EXPORT_ORDERS),
});

/**
 * Fetch the latest order data from the PDK.
 */
export const ordersFetchAction = defineAction({
  name: AdminAction.ORDERS_FETCH,
  icon: AdminIcon.REFRESH,
  label: 'action_refresh',
  handler: createQueryFetcher(BackendEndpoint.FETCH_ORDERS),
});

/**
 * Update order data.
 */
export const ordersUpdateAction = defineAction({
  name: AdminAction.ORDERS_UPDATE,
  icon: AdminIcon.SAVE,
  label: 'action_save',
  handler: createMutator(BackendEndpoint.UPDATE_ORDERS),
});

/**
 * Shown if not in order mode. Exports order and immediately prints shipment labels.
 */
export const ordersExportPrintShipmentsAction = defineAction({
  name: AdminAction.ORDERS_EXPORT_PRINT,
  icon: AdminIcon.PRINT,
  label: 'action_export_print',
  handler: createMutator(BackendEndpoint.EXPORT_ORDERS),
  beforeHandle: resolveOrderParameters,
  afterHandle(context) {
    void executeNextAction(context, ordersPrintAction, context.parameters);

    return context.response;
  },
});

/**
 * Shown if not in order mode. Exports all shipment labels.
 */
export const ordersPrintAction = defineAction({
  name: AdminAction.ORDERS_PRINT,
  icon: AdminIcon.PRINT,
  label: 'action_print',
  handler: createMutator(BackendEndpoint.PRINT_ORDERS),

  async beforeHandle(context) {
    await waitForLabelPrompt(context);

    return context.parameters;
  },

  async afterHandle(context) {
    await openOrPrint(context);

    void executeNextAction(context, shipmentsFetchAction, context.parameters);

    return context.response;
  },
});

/**
 * Shown on orders that have been exported to MyParcel using order mode.
 */
export const orderViewInBackofficeAction = defineAction({
  id: 'show-exported-order',
  icon: AdminIcon.EXTERNAL,
  label: 'order_view_in_backoffice',
  handler() {
    window.open('https://backoffice.myparcel.nl/orders', '_blank');
  },
});
