import {Component} from 'vue';

export type PdkComponentName =
  | 'PdkAccordion'
  | 'PdkAlert'
  | 'PdkButton'
  | 'PdkCard'
  | 'PdkCheckbox'
  | 'PdkDropdownButton'
  | 'PdkDropdownButtonItem'
  | 'PdkFormGroup'
  | 'PdkIcon'
  | 'PdkInput'
  | 'PdkModal'
  | 'PdkMultiCheckbox'
  | 'PdkRadio'
  | 'PdkSelect'
  | 'PdkTable'
  | 'PdkTableCol'
  | 'PdkTableRow';

export type PdkRenderComponent =
  | 'LoadingPage'
  | 'Modals'
  | 'ModuleSettings'
  | 'Notifications'
  | 'OrderCard'
  | 'OrderListColumn';

export type ComponentMap = {
  [K in PdkComponentName]: Component;
};

export type ComponentImportFunction = () => Promise<{default: Component}>;
