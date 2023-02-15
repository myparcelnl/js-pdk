import {BackendEndpoint, FrontendEndpoint} from './endpoints';
import {Component} from 'vue';
import {Plugin} from './php-pdk.types';

export const requiredAdminComponentNames = [
  'PdkBox',
  'PdkButton',
  'PdkCheckboxInput',
  'PdkCol',
  'PdkCurrencyInput',
  'PdkDropOffInput',
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
  'PdkTimeInput',
  'PdkToggleInput',
] as const;

export const optionalAdminPlainWrapperComponentNames = [
  'PdkButtonGroup',
  'PdkPluginSettingsWrapper',
  'PdkTabNavButtonWrapper',
  'PdkTabNavContentWrapper',
  'PdkTableCol',
  'PdkTableRow',
] as const;

export const optionalAdminActionContainerComponentNames = ['PdkConceptBoxWrapper', 'PdkShipmentLabelWrapper'] as const;

export type RequiredAdminComponentName = (typeof requiredAdminComponentNames)[number];

export type OptionalAdminComponentName =
  | (typeof optionalAdminPlainWrapperComponentNames)[number]
  | (typeof optionalAdminActionContainerComponentNames)[number];

export type AdminComponentName = RequiredAdminComponentName | OptionalAdminComponentName;

export type AdminComponentMap = Record<RequiredAdminComponentName, Component> &
  Partial<Record<OptionalAdminComponentName, Component>>;

export type ComponentImportFunction = () => Promise<{default: Component}>;

export enum AdminView {
  LOADING_PAGE = 'LoadingPage',
  MODALS = 'Modals',
  NOTIFICATIONS = 'Notifications',
  ORDER_BOX = 'OrderBox',
  ORDER_LIST_COLUMN = 'OrderListColumn',
  PRODUCT_SETTINGS = 'ProductSettings',
  PLUGIN_SETTINGS = 'PluginSettings',
}

export enum Variant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum Size {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export enum Status {
  ERROR = 'error',
  PENDING = 'pending',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export type EndpointObject<T extends BackendEndpoint | FrontendEndpoint> = Record<T, Plugin.AbstractEndpointRequest>;

export type BackendPdkEndpointObject = EndpointObject<BackendEndpoint>;

export type FrontendPdkEndpointObject = EndpointObject<FrontendEndpoint>;
