/* eslint-disable max-len,vue/max-len */

import {FormInstance} from '@myparcel/vue-form-builder';
import {Plugin} from '@myparcel-pdk/common';

export enum PdkAction {
  LABEL_CREATE_RETURN = 'labelCreateReturn',
  LABEL_DELETE = 'labelDelete',
  ORDER_EXPORT = 'orderExport',
  ORDER_EXPORT_PRINT = 'orderExportPrint',
  ORDER_PRINT = 'orderPrint',
  ORDER_REFRESH_LABELS = 'orderRefreshLabels',
  ORDER_UPDATE = 'orderUpdate',
  SHIPMENT_PRINT = 'shipmentPrint',
  SHIPMENT_REFRESH = 'shipmentRefresh',
}

export type ActionFn<A extends PdkAction> = (parameters: ActionParameters<A>) => Promise<ActionResponse<A>>;

export type ActionParameters<A extends PdkAction> = A extends PdkAction.ORDER_EXPORT | PdkAction.ORDER_EXPORT_PRINT
  ? {orderIds: string[] | string; print: boolean; form?: FormInstance}
  : A extends PdkAction.ORDER_UPDATE
  ? {orderId: string; form: FormInstance}
  : A extends PdkAction.SHIPMENT_REFRESH | PdkAction.SHIPMENT_PRINT
  ? {orderId: string; shipmentIds: number[] | number}
  : Record<string, unknown>;

export type ActionResponse<A extends PdkAction> = A extends
  | PdkAction.ORDER_EXPORT
  | PdkAction.ORDER_EXPORT_PRINT
  | PdkAction.ORDER_REFRESH_LABELS
  | PdkAction.ORDER_PRINT
  | PdkAction.ORDER_UPDATE
  ? Plugin.ModelPdkOrder[]
  : Record<string, unknown>;

export const printActions = [PdkAction.SHIPMENT_PRINT, PdkAction.ORDER_EXPORT_PRINT, PdkAction.ORDER_PRINT];

export const updateShipmentActions = [
  PdkAction.LABEL_DELETE,
  PdkAction.SHIPMENT_REFRESH,
  PdkAction.ORDER_EXPORT,
  PdkAction.ORDER_EXPORT_PRINT,
  PdkAction.ORDER_REFRESH_LABELS,
];
