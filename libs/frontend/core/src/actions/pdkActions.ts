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

export const modalOpenAction: OnClickAction = {
  id: 'open',
  label: 'action_open_shipment_modal',
  onClick: <K extends ModalKey>(modalKey: K, context: PdkModalContext<K>) => {
    const modalStore = useModalStore();
    modalStore.open(modalKey, context);
  },
};

export const orderExportAction: InputPdkButtonAction = {
  action: FrontendAction.ORDER_EXPORT,
  icon: PdkIcon.EXPORT,
  label: 'action_export',
};

export const orderExportPrintAction: InputPdkButtonAction = {
  action: FrontendAction.ORDER_EXPORT_PRINT,
  icon: PdkIcon.PRINT,
  label: 'action_export_print',
};

export const orderPrintAction: InputPdkButtonAction = {
  action: FrontendAction.ORDER_PRINT,
  icon: PdkIcon.PRINT,
  label: 'action_print',
};

export const orderUpdateAction = {
  action: FrontendAction.ORDER_UPDATE,
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
  action: FrontendAction.SHIPMENTS_REFRESH,
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
  orderExportPrintAction,
  orderPrintAction,
  orderUpdateAction,
  shipmentCreateReturnAction,
  shipmentPrintAction,
  shipmentRefreshAction,
];
