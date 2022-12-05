import {Component} from 'vue';

export type PdkComponentName =
  | 'PdkAccordion'
  | 'PdkAlert'
  | 'PdkButton'
  | 'PdkCard'
  | 'PdkCheckbox'
  | 'PdkDropdownButton'
  | 'PdkFormGroup'
  | 'PdkIcon'
  | 'PdkImage'
  | 'PdkInput'
  | 'PdkModal'
  | 'PdkMultiCheckbox'
  | 'PdkNumberInput'
  | 'PdkRadio'
  | 'PdkSelect'
  | 'PdkTable'
  | 'PdkTableCol'
  | 'PdkTableRow'
  | 'PdkToggle';

export type PdkRenderComponent =
  | 'LoadingPage'
  | 'Modals'
  | 'ModuleSettings'
  | 'Notifications'
  | 'OrderCard'
  | 'OrderListColumn';

export type PdkComponentMap = {
  [K in PdkComponentName]: Component;
};

export type ComponentImportFunction = () => Promise<{default: Component}>;
