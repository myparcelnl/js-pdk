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
  'PdkLoader',
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
  LoadingPage = 'LoadingPage',
  Modals = 'Modals',
  Notifications = 'Notifications',
  OrderBox = 'OrderBox',
  OrderListItem = 'OrderListItem',
  ProductSettings = 'ProductSettings',
  PluginSettings = 'PluginSettings',
}

export enum Variant {
  Primary = 'primary',
  Secondary = 'secondary',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
}

export enum Size {
  ExtraSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

export enum Status {
  Error = 'error',
  Pending = 'pending',
  Success = 'success',
  Warning = 'warning',
}

export type EndpointObject<T extends BackendEndpoint | FrontendEndpoint> = Record<T, Plugin.AbstractEndpointRequest>;

export type BackendPdkEndpointObject = EndpointObject<BackendEndpoint>;

export type FrontendPdkEndpointObject = EndpointObject<FrontendEndpoint>;
