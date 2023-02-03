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

export type PdkComponentMap = Record<RequiredPdkComponentName, Component> &
  Partial<Record<OptionalPdkComponentName, Component>>;

export type ComponentImportFunction = () => Promise<{default: Component}>;

export enum PdkAdminComponent {
  LOADING_PAGE = 'LoadingPage',
  MODALS = 'Modals',
  NOTIFICATIONS = 'Notifications',
  ORDER_CARD = 'OrderCard',
  ORDER_LIST_COLUMN = 'OrderListColumn',
  PRODUCT_SETTINGS = 'ProductSettings',
  PLUGIN_SETTINGS = 'PluginSettings',
}

export enum PdkVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum PdkButtonSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export enum PdkStatus {
  ERROR = 'error',
  PENDING = 'pending',
  SUCCESS = 'success',
  WARNING = 'warning',
}
