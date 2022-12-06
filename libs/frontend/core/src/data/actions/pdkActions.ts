import {InputPdkButtonAction, PdkDropdownAction, PdkIcon, useModalStore} from '../../';
import {PdkAction} from './actions';

export const deleteAction: PdkDropdownAction = {
  action: PdkAction.LABEL_DELETE,
  icon: PdkIcon.DELETE,
  label: 'action_delete',
  variant: 'danger',
};

export const modalCancelAction: InputPdkButtonAction = {
  id: 'cancel',
  label: 'action_cancel',
  onClick: () => {
    useModalStore().close();
  },
};

export const orderExportAction: InputPdkButtonAction = {
  action: PdkAction.ORDER_EXPORT,
  icon: PdkIcon.ADD,
  label: 'action_export',
};

export const orderExportPrintAction: InputPdkButtonAction = {
  action: PdkAction.ORDER_EXPORT_PRINT,
  icon: PdkIcon.PRINT,
  label: 'action_export_print',
};

export const orderUpdateAction = {
  action: PdkAction.ORDER_UPDATE,
  icon: PdkIcon.SAVE,
  label: 'action_save',
};

export const shipmentCreateReturnAction: PdkDropdownAction = {
  action: PdkAction.LABEL_CREATE_RETURN,
  icon: PdkIcon.RETURN,
  label: 'action_create_return_label',
};

export const shipmentPrintAction: PdkDropdownAction = {
  action: PdkAction.SHIPMENT_PRINT,
  icon: PdkIcon.PRINT,
  label: 'action_print',
};

export const shipmentRefreshAction: PdkDropdownAction = {
  action: PdkAction.SHIPMENT_REFRESH,
  icon: PdkIcon.REFRESH,
  label: 'action_refresh',
};
