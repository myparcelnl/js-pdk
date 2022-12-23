import {Component} from 'vue';

export const componentNames: readonly string[] = [
  // Form inputs
  'PdkCheckboxInput',
  'PdkCurrencyInput',
  'PdkNumberInput',
  'PdkRadioInput',
  'PdkSelectInput',
  'PdkTextInput',
  'PdkToggleInput',

  // Form components
  'PdkButton',
  'PdkFormGroup',
  'PdkMultiCheckbox',
  'PdkMultiRadio',

  'PdkPluginSettingsWrapper',

  // Other components
  'PdkNotification',
  'PdkButtonGroup',
  'PdkCard',
  'PdkDropdownButton',
  'PdkIcon',
  'PdkImage',
  'PdkLink',
  'PdkModal',
  'PdkTable',
  'PdkTableCol',
  'PdkTableRow',

  // Used for all positioning
  'PdkRow',
  'PdkCol',
];

export type PdkComponentName = typeof componentNames[number];

export type PdkViewComponent =
  | 'LoadingPage'
  | 'Modals'
  | 'Notifications'
  | 'OrderCard'
  | 'OrderListColumn'
  | 'ProductSettings'
  | 'PluginSettings';

export type PdkComponentMap = Record<PdkComponentName, Component>;

export type ComponentImportFunction = () => Promise<{default: Component}>;

export type PdkVariant = 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'success';
