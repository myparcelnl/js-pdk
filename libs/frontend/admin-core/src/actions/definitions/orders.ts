import {BackendEndpoint} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {openOrPrintPdf, resolvePrintParameters} from '../print';
import {createMutationHandler, createQueryHandler, executeNextAction, resolveOrderParameters} from '../executors';
import {defineAction} from '../defineAction';
import {type ActionParameters, AdminAction, AdminIcon, AdminModalKey} from '../../types';
import {useModalStore} from '../../stores';
import {shipmentsUpdateAction} from './shipments';

/**
 * Open modal to edit order shipment options.
 */
export const ordersEditAction = defineAction({
  name: AdminAction.OrdersEdit,
  icon: AdminIcon.Edit,
  label: 'action_edit',
  handler(context) {
    const modalStore = useModalStore();
    const parameters = context.parameters as ActionParameters<AdminAction.OrdersExport>;

    modalStore.open(AdminModalKey.ShipmentOptions, {orderIds: parameters.orderIds});
  },
});

/**
 * Shown only in order mode. Exports entire order.
 */
export const orderExportAction = defineAction({
  name: AdminAction.OrdersExport,
  icon: AdminIcon.Export,
  label: 'action_export',
  beforeHandle: resolveOrderParameters,
  handler: createMutationHandler(BackendEndpoint.ExportOrders),
});

/**
 * Shown if not in order mode. Exports shipments.
 */
export const orderExportToShipmentsAction = defineAction({
  name: AdminAction.OrdersExport,
  icon: AdminIcon.Export,
  label: 'action_export_shipments',
  beforeHandle: resolveOrderParameters,
  handler: createMutationHandler(BackendEndpoint.ExportOrders),
});

/**
 * Fetch the latest order data from the PDK.
 */
export const ordersFetchAction = defineAction({
  name: AdminAction.OrdersFetch,
  icon: AdminIcon.Refresh,
  label: 'action_refresh',
  handler: createQueryHandler(BackendEndpoint.FetchOrders, (context) => {
    const orderIds = toArray(context.parameters.orderIds ?? []);

    return orderIds.length === 1 ? orderIds[0] : undefined;
  }),
});

/**
 * Update order data.
 */
export const ordersUpdateAction = defineAction({
  name: AdminAction.OrdersUpdate,
  icon: AdminIcon.Save,
  label: 'action_save',
  beforeHandle: resolveOrderParameters,
  handler: createMutationHandler(BackendEndpoint.UpdateOrders),
});

/**
 * Shown if not in order mode. Exports order and immediately prints shipment labels.
 */
export const ordersExportPrintShipmentsAction = defineAction({
  name: AdminAction.OrdersExportPrint,
  icon: AdminIcon.Print,
  label: 'action_export_print',
  beforeHandle: resolveOrderParameters,
  handler: createMutationHandler(BackendEndpoint.ExportOrders),
  afterHandle(context) {
    void executeNextAction(context, ordersPrintAction, context.parameters);

    return context.response;
  },
});

/**
 * Shown if not in order mode. Exports all shipment labels.
 */
export const ordersPrintAction = defineAction({
  name: AdminAction.OrdersPrint,
  icon: AdminIcon.Print,
  label: 'action_print',
  beforeHandle: resolvePrintParameters,
  handler: createMutationHandler(BackendEndpoint.PrintOrders),
  async afterHandle(context) {
    await openOrPrintPdf(context);

    void executeNextAction(context, shipmentsUpdateAction, context.parameters);

    return context.response;
  },
});

/**
 * Shown on orders that have been exported to MyParcel using order mode.
 */
export const orderViewInBackofficeAction = defineAction({
  id: 'show-exported-order',
  icon: AdminIcon.External,
  label: 'order_view_in_backoffice',
  handler() {
    window.open('https://backoffice.myparcel.nl/orders', '_blank');
  },
});
