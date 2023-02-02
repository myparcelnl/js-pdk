import {FrontendAction, ModalKey, PdkIcon, PdkModalContext} from '../../types';
import {createMutator, createQueryFetcher, executeNextAction, resolveOrderParameters} from '../executors';
import {openOrPrint, waitForLabelPrompt} from '../print';
import {EndpointName} from '@myparcel-pdk/common';
import {defineAction} from '../defineAction';
import {shipmentsFetchAction} from './shipments';
import {useModalStore} from '../../stores';

/**
 * Open modal to edit order shipment options.
 */
export const ordersEditAction = defineAction({
  id: 'open',
  icon: PdkIcon.EDIT,
  label: 'action_edit',
  handler<K extends ModalKey>(modalKey: K, context: PdkModalContext<K>) {
    const modalStore = useModalStore();
    modalStore.open(modalKey, context);
  },
});

/**
 * Shown only in order mode. Exports entire order.
 */
export const orderExportAction = defineAction({
  name: FrontendAction.ORDERS_EXPORT,
  icon: PdkIcon.EXPORT,
  label: 'action_export',
  beforeHandle: resolveOrderParameters,
  handler: createMutator(EndpointName.EXPORT_ORDERS),
});

/**
 * Shown if not in order mode. Exports shipments.
 */
export const orderExportToShipmentsAction = defineAction({
  name: FrontendAction.ORDERS_EXPORT,
  icon: PdkIcon.EXPORT,
  label: 'action_export_shipments',
  beforeHandle: resolveOrderParameters,
  handler: createMutator(EndpointName.EXPORT_ORDERS),
});

/**
 * Fetch the latest order data from the PDK.
 */
export const ordersFetchAction = defineAction({
  name: FrontendAction.ORDERS_FETCH,
  icon: PdkIcon.REFRESH,
  label: 'action_refresh',
  handler: createQueryFetcher(EndpointName.FETCH_ORDERS),
});

/**
 * Update order data.
 */
export const ordersUpdateAction = defineAction({
  name: FrontendAction.ORDERS_UPDATE,
  icon: PdkIcon.SAVE,
  label: 'action_save',
  handler: createMutator(EndpointName.UPDATE_ORDERS),
});

/**
 * Shown if not in order mode. Exports order and immediately prints shipment labels.
 */
export const ordersExportPrintShipmentsAction = defineAction({
  name: FrontendAction.ORDERS_EXPORT_PRINT,
  icon: PdkIcon.PRINT,
  label: 'action_export_print',
  handler: createMutator(EndpointName.EXPORT_ORDERS),
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
  name: FrontendAction.ORDERS_PRINT,
  icon: PdkIcon.PRINT,
  label: 'action_print',
  handler: createMutator(EndpointName.PRINT_ORDERS),

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
  icon: PdkIcon.EXTERNAL,
  label: 'order_view_in_backoffice',
  handler() {
    window.open('https://backoffice.myparcel.nl/orders', '_blank');
  },
});
