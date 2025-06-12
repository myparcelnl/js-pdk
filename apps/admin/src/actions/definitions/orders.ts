import {BackendEndpoint} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {openOrPrintPdf, resolvePrintParameters} from '../print';
import {createOrdersMutationHandler, createQueryHandler, executeNextAction, resolveOrderParameters} from '../executors';
import {defineAction} from '../defineAction';
import {getOrderShipmentIds} from '../../utils';
import {type OrderIds} from '../../types';
import {useModalStore} from '../../stores';
import {AdminAction, AdminIcon, AdminModalKey} from '../../data';
import {shipmentsUpdateAction} from './shipments';
import {useGlobalContext} from '../../composables/context/useGlobalContext';

/**
 * Open modal to edit order shipment options.
 */
export const ordersEditAction = defineAction({
  name: AdminAction.OrdersEdit,
  icon: AdminIcon.Edit,
  label: 'action_edit',
  handler(context) {
    const modalStore = useModalStore();
    const {parameters} = context;

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
  handler: createOrdersMutationHandler(BackendEndpoint.ExportOrders),
});

/**
 * Shown if not in order mode. Exports shipments.
 */
export const orderExportToShipmentsAction = defineAction({
  name: AdminAction.OrdersExport,
  icon: AdminIcon.Export,
  label: 'action_export_shipments',
  beforeHandle: resolveOrderParameters,
  handler: createOrdersMutationHandler(BackendEndpoint.ExportOrders),
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

    return orderIds.length === 1 ? String(orderIds[0]) : undefined;
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
  handler: createOrdersMutationHandler(BackendEndpoint.UpdateOrders),
});

/**
 * Shown if not in order mode. Exports order and immediately prints shipment labels.
 */
export const ordersExportPrintShipmentsAction = defineAction({
  name: AdminAction.OrdersExportPrint,
  icon: AdminIcon.Print,
  label: 'action_export_print',
  beforeHandle: resolveOrderParameters,
  handler: createOrdersMutationHandler(BackendEndpoint.ExportOrders),
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
  handler: createOrdersMutationHandler(BackendEndpoint.PrintOrders, true),
  async afterHandle(context) {
    await openOrPrintPdf(context);

    void executeNextAction(context, shipmentsUpdateAction, {
      ...context.parameters,
      shipmentIds: getOrderShipmentIds((context.parameters.orderIds as OrderIds) ?? []),
    });

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
    const {platform} = useGlobalContext();
    window.open(`${platform.backofficeUrl}/orders`, '_blank');
  },
});
