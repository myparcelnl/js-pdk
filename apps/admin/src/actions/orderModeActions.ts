import {type AnyActionDefinition} from '../types';
import {OrderMode} from '../data';
import {
  orderExportAction,
  orderExportToShipmentsAction,
  ordersEditAction,
  ordersExportPrintShipmentsAction,
  ordersPrintAction,
  orderViewInBackofficeAction,
  shipmentsDeleteAction,
  shipmentsExportReturnAction,
  shipmentsPrintAction,
  shipmentsUpdateAction,
} from './definitions';

export {ORDER_VIEW_IN_BACKOFFICE_ID} from './definitions';

/**
 * Mode-specific actions for global store registration (superset of all available actions per mode).
 *
 * OrderV2 currently mirrors the Shipments set so manual shipment export and the related
 * actions remain available while V2 fulfilment continues externally. INT-1590 will
 * make this conditional on sales-channel detection so V2 with an active sales channel
 * goes back to an empty set.
 */
export const STORE_MODE_ACTIONS: Record<OrderMode, AnyActionDefinition[]> = {
  [OrderMode.OrderV1]: [orderExportAction, orderViewInBackofficeAction],
  [OrderMode.Shipments]: [
    ordersPrintAction,
    orderExportToShipmentsAction,
    ordersExportPrintShipmentsAction,
    shipmentsExportReturnAction,
    shipmentsDeleteAction,
    shipmentsUpdateAction,
    shipmentsPrintAction,
  ],
  // @TODO INT-1590: empty this array again once sales-channel detection gates V2.
  [OrderMode.OrderV2]: [
    ordersPrintAction,
    orderExportToShipmentsAction,
    ordersExportPrintShipmentsAction,
    shipmentsExportReturnAction,
    shipmentsDeleteAction,
    shipmentsUpdateAction,
    shipmentsPrintAction,
  ],
};

/**
 * Mode-specific actions for the ShipmentOptionsBox component.
 *
 * OrderV2 currently mirrors the Shipments set so the order-detail box exposes manual
 * export, print and export-print actions. {@see STORE_MODE_ACTIONS} for the
 * INT-1590 follow-up note.
 */
export const BOX_MODE_ACTIONS: Record<OrderMode, AnyActionDefinition[]> = {
  [OrderMode.OrderV1]: [orderExportAction],
  [OrderMode.Shipments]: [orderExportToShipmentsAction, ordersPrintAction, ordersExportPrintShipmentsAction],
  // @TODO INT-1590: empty this array again once sales-channel detection gates V2.
  [OrderMode.OrderV2]: [orderExportToShipmentsAction, ordersPrintAction, ordersExportPrintShipmentsAction],
};

/**
 * Mode-specific actions for the ShipmentOptionsModal component.
 *
 * OrderV2 currently mirrors the Shipments set so the modal exposes manual export and
 * export-print actions. {@see STORE_MODE_ACTIONS} for the INT-1590 follow-up note.
 */
export const MODAL_MODE_ACTIONS: Record<OrderMode, AnyActionDefinition[]> = {
  [OrderMode.OrderV1]: [orderExportAction],
  [OrderMode.Shipments]: [orderExportToShipmentsAction, ordersExportPrintShipmentsAction],
  // @TODO INT-1590: empty this array again once sales-channel detection gates V2.
  [OrderMode.OrderV2]: [orderExportToShipmentsAction, ordersExportPrintShipmentsAction],
};

/**
 * Mode-specific actions rendered in the order-list-item button group.
 * Shipments mode uses its own computed action logic in ShipmentModeOrderListItem.vue.
 *
 * OrderV2 surfaces the same edit + manual export combination as OrderV1, but routes
 * export through the shipments-export action because in V2 the backend falls through
 * to the shipments-export path. {@see STORE_MODE_ACTIONS} for the INT-1590 follow-up
 * note.
 */
export const LIST_ITEM_MODE_ACTIONS: Record<OrderMode, AnyActionDefinition[]> = {
  [OrderMode.OrderV1]: [ordersEditAction, orderExportAction],
  // @TODO INT-1590: drop orderExportToShipmentsAction once sales-channel detection gates V2.
  [OrderMode.OrderV2]: [ordersEditAction, orderExportToShipmentsAction],
  [OrderMode.Shipments]: [],
};
