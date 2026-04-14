import {type AnyActionDefinition} from '../types';
import {OrderMode} from '../data';
import {
  orderExportAction,
  orderExportToShipmentsAction,
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
  [OrderMode.OrderV2]: [],
};

/**
 * Mode-specific actions for the ShipmentOptionsBox component.
 */
export const BOX_MODE_ACTIONS: Record<OrderMode, AnyActionDefinition[]> = {
  [OrderMode.OrderV1]: [orderExportAction],
  [OrderMode.Shipments]: [orderExportToShipmentsAction, ordersPrintAction, ordersExportPrintShipmentsAction],
  [OrderMode.OrderV2]: [],
};

/**
 * Mode-specific actions for the ShipmentOptionsModal component.
 */
export const MODAL_MODE_ACTIONS: Record<OrderMode, AnyActionDefinition[]> = {
  [OrderMode.OrderV1]: [orderExportAction],
  [OrderMode.Shipments]: [orderExportToShipmentsAction, ordersExportPrintShipmentsAction],
  [OrderMode.OrderV2]: [],
};
