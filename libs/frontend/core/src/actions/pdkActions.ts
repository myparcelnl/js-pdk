import {
  InputPdkButtonAction,
  ModalKey,
  NamedAction,
  OnClickAction,
  PdkDropdownAction,
  PdkIcon,
  PdkModalContext,
} from '../types';
import {FrontendAction} from './consts';
import {useModalStore} from '../stores';

export const deleteAction: PdkDropdownAction = {
  action: FrontendAction.SHIPMENTS_DELETE,
  icon: PdkIcon.DELETE,
  label: 'action_delete',
  variant: 'error',
};

export const modalCancelAction: OnClickAction = {
  id: 'cancel',
  label: 'action_cancel',
  onClick: () => {
    const modalStore = useModalStore();
    modalStore.close();
  },
};

export const orderEditAction: OnClickAction = {
  id: 'open',
  icon: PdkIcon.EDIT,
  label: 'action_edit',
  onClick: <K extends ModalKey>(modalKey: K, context: PdkModalContext<K>) => {
    const modalStore = useModalStore();
    modalStore.open(modalKey, context);
  },
};

/**
 * Shown in order mode. Exports entire order.
 */
export const orderExportAction: InputPdkButtonAction = {
  action: FrontendAction.ORDERS_EXPORT,
  icon: PdkIcon.EXPORT,
  label: 'action_export',
};

/**
 * Shown on orders that have been exported to MyParcel using order mode.
 */
export const viewOrderInBackofficeAction: OnClickAction = {
  icon: PdkIcon.EXTERNAL,
  label: 'order_view_in_backoffice',
  id: 'show-exported-order',
  onClick: () => {
    window.open(`https://backoffice.myparcel.nl/orders`, '_blank');
  },
};

/**
 * Shown if not in order mode. Exports shipments.
 */
export const orderExportShipmentsAction: InputPdkButtonAction = {
  action: FrontendAction.ORDERS_EXPORT,
  icon: PdkIcon.EXPORT,
  label: 'action_export_shipments',
};

/**
 * Shown if not in order mode. Prints shipment labels.
 */
export const orderExportPrintShipmentsAction: InputPdkButtonAction = {
  action: FrontendAction.ORDERS_EXPORT_PRINT,
  icon: PdkIcon.PRINT,
  label: 'action_export_print',
};

/**
 * Shown if not in order mode. Exports all shipment labels.
 */
export const orderPrintAction: InputPdkButtonAction = {
  action: FrontendAction.ORDERS_PRINT,
  icon: PdkIcon.PRINT,
  label: 'action_print',
};

export const orderUpdateAction = {
  action: FrontendAction.ORDERS_UPDATE,
  icon: PdkIcon.SAVE,
  label: 'action_save',
};

export const shipmentCreateReturnAction: PdkDropdownAction = {
  action: FrontendAction.SHIPMENTS_CREATE_RETURN,
  icon: PdkIcon.RETURN,
  label: 'action_create_return_label',
};

export const shipmentPrintAction: PdkDropdownAction = {
  action: FrontendAction.SHIPMENTS_PRINT,
  icon: PdkIcon.PRINT,
  label: 'action_print',
};

export const shipmentRefreshAction: PdkDropdownAction = {
  action: FrontendAction.SHIPMENTS_UPDATE,
  icon: PdkIcon.REFRESH,
  label: 'action_refresh',
};

export const pluginSettingsUpdateAction: NamedAction = {
  action: FrontendAction.PLUGIN_SETTINGS_UPDATE,
  icon: PdkIcon.SAVE,
  label: 'action_save',
};

export const webhooksCreateAction: NamedAction = {
  action: FrontendAction.WEBHOOKS_CREATE,
  icon: PdkIcon.ADD,
  label: 'action_create',
};

export const webhooksDeleteAction: NamedAction = {
  action: FrontendAction.WEBHOOKS_DELETE,
  icon: PdkIcon.DELETE,
  label: 'action_delete',
};

export const webhooksRefreshAction: NamedAction = {
  action: FrontendAction.WEBHOOKS_REFRESH,
  icon: PdkIcon.REFRESH,
  label: 'action_refresh',
};

export const actions: NamedAction[] = [
  deleteAction,
  orderExportAction,
  orderExportPrintShipmentsAction,
  orderExportShipmentsAction,
  orderPrintAction,
  orderUpdateAction,
  pluginSettingsUpdateAction,
  shipmentCreateReturnAction,
  shipmentPrintAction,
  shipmentRefreshAction,
  webhooksCreateAction,
  webhooksDeleteAction,
  webhooksRefreshAction,
];
