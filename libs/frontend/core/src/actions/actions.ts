/* eslint-disable max-len,vue/max-len */
import {FormInstance} from '@myparcel/vue-form-builder';
import {OneOrMore} from '@myparcel/ts-utils';
import {Plugin} from '@myparcel-pdk/common';

export type ActionFn<A extends FrontendAction> = (parameters: ActionParameters<A>) => Promise<ActionResponse<A>>;

export type ActionParameters<A extends FrontendAction> = A extends
  | FrontendAction.ORDER_EXPORT
  | FrontendAction.ORDER_EXPORT_PRINT
  ? {orderIds: OneOrMore<string>; form?: FormInstance}
  : A extends FrontendAction.ORDER_UPDATE
  ? {orderIds: OneOrMore<string>; form: FormInstance}
  : A extends FrontendAction.SHIPMENT_DELETE | FrontendAction.SHIPMENT_REFRESH | FrontendAction.SHIPMENT_PRINT
  ? {orderIds?: OneOrMore<string>; shipmentIds?: OneOrMore<number>}
  : Record<string, unknown>;

export type ActionResponse<A extends FrontendAction> = A extends
  | FrontendAction.ORDER_EXPORT
  | FrontendAction.ORDER_EXPORT_PRINT
  | FrontendAction.ORDER_REFRESH
  | FrontendAction.ORDER_PRINT
  | FrontendAction.ORDER_UPDATE
  ? Plugin.ModelPdkOrder[]
  : Record<string, unknown>;

export enum FrontendAction {
  LABEL_CREATE_RETURN = 'labelCreateReturn',
  SHIPMENT_DELETE = 'labelDelete',
  ORDER_EXPORT = 'orderExport',
  ORDER_EXPORT_PRINT = 'orderExportPrint',
  ORDER_PRINT = 'orderPrint',
  ORDER_REFRESH = 'orderRefreshLabels',
  ORDER_UPDATE = 'orderUpdate',
  SHIPMENT_PRINT = 'shipmentPrint',
  SHIPMENT_REFRESH = 'shipmentRefresh',
}

export const printActions = [
  FrontendAction.SHIPMENT_PRINT,
  FrontendAction.ORDER_EXPORT_PRINT,
  FrontendAction.ORDER_PRINT,
];

export const updateOrderActions = [
  FrontendAction.ORDER_UPDATE,
  FrontendAction.ORDER_EXPORT,
  FrontendAction.ORDER_EXPORT_PRINT,
];

export const updateShipmentActions = [
  FrontendAction.SHIPMENT_DELETE,
  FrontendAction.SHIPMENT_REFRESH,
  FrontendAction.ORDER_EXPORT,
  FrontendAction.ORDER_EXPORT_PRINT,
  FrontendAction.ORDER_REFRESH,
];
