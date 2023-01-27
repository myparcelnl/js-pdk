import {Component} from 'vue';

export const requiredComponentNames = [
  'PdkButton',
  'PdkCard',
  'PdkCheckboxInput',
  'PdkCol',
  'PdkCurrencyInput',
  'PdkDropdownButton',
  'PdkFormGroup',
  'PdkHeading',
  'PdkIcon',
  'PdkImage',
  'PdkLink',
  'PdkModal',
  'PdkMultiCheckbox',
  'PdkMultiRadio',
  'PdkNotification',
  'PdkNumberInput',
  'PdkRadioInput',
  'PdkRow',
  'PdkSelectInput',
  'PdkTabNavButton',
  'PdkTable',
  'PdkTextInput',
  'PdkToggleInput',
] as const;

export const optionalPlainWrapperComponentNames = [
  'PdkButtonGroup',
  'PdkPluginSettingsWrapper',
  'PdkTabNavButtonWrapper',
  'PdkTabNavContentWrapper',
  'PdkTableCol',
  'PdkTableRow',
] as const;

export const optionalActionContainerComponentNames = ['PdkConceptCardWrapper', 'PdkShipmentLabelWrapper'] as const;

export type RequiredPdkComponentName = (typeof requiredComponentNames)[number];

export type OptionalPdkComponentName =
  | (typeof optionalPlainWrapperComponentNames)[number]
  | (typeof optionalActionContainerComponentNames)[number];

export type PdkComponentName = RequiredPdkComponentName | OptionalPdkComponentName;

export type PdkViewComponent =
  | 'LoadingPage'
  | 'Modals'
  | 'Notifications'
  | 'OrderCard'
  | 'OrderListColumn'
  | 'ProductSettings'
  | 'PluginSettings';

export type PdkComponentMap = Record<RequiredPdkComponentName, Component> &
  Partial<Record<OptionalPdkComponentName, Component>>;

export type ComponentImportFunction = () => Promise<{default: Component}>;

export type PdkVariant = 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'success';

export enum PdkButtonSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}
