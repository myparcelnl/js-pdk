/* eslint-disable max-len,vue/max-len */

export enum PdkAction {
  CREATE_RETURN_LABEL = 'createReturnLabel',
  LABEL_DELETE = 'delete',
  LABEL_PRINT = 'print',
  LABEL_REFRESH = 'refresh',
  ORDER_EXPORT = 'export',
  ORDER_EXPORT_PRINT = 'exportPrint',
  ORDER_GET_CONTEXT = 'getOrderDataContext',
  ORDER_PRINT = 'print',
  ORDER_REFRESH_LABELS = 'refreshLabels',
  ORDER_SAVE_DELIVERY_OPTIONS = 'saveDeliveryOptions',
}

export type ActionResponse<CK = PdkAction> = Record<string, unknown>;

export const printActions = [PdkAction.LABEL_PRINT, PdkAction.ORDER_EXPORT_PRINT, PdkAction.ORDER_PRINT] as const;

export const modifyLabelActions = [
  PdkAction.LABEL_DELETE,
  PdkAction.LABEL_REFRESH,
  PdkAction.ORDER_EXPORT,
  PdkAction.ORDER_EXPORT_PRINT,
  PdkAction.ORDER_REFRESH_LABELS,
] as const;
