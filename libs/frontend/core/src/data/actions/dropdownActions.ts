import {DropdownButtonItem} from '@myparcel-pdk/frontend-shared';
import {PdkAction} from './actions';

export const deleteAction: DropdownButtonItem = {
  label: 'action_delete',
  action: PdkAction.LABEL_DELETE,
  icon: 'delete',
  variant: 'danger',
};

export const refreshAction: DropdownButtonItem = {
  label: 'action_refresh',
  action: PdkAction.LABEL_REFRESH,
  icon: 'refresh',
};

export const returnAction: DropdownButtonItem = {
  label: 'action_create_return_label',
  action: PdkAction.CREATE_RETURN_LABEL,
  icon: 'reply',
};

export const printAction: DropdownButtonItem = {
  label: 'action_print',
  action: PdkAction.LABEL_PRINT,
  icon: 'print',
};
