import {BackendEndpoint, FrontendEndpoint} from './endpoints';
import {Component} from 'vue';
import {Plugin} from './php-pdk.types';

export const ADMIN_COMPONENT_PREFIX = 'Pdk';

export enum AdminComponent {
  Box = 'Box',
  Button = 'Button',
  ButtonGroup = 'ButtonGroup',
  CheckboxInput = 'CheckboxInput',
  Col = 'Col',
  ConceptBoxWrapper = 'ConceptBoxWrapper',
  CurrencyInput = 'CurrencyInput',
  DropOffInput = 'DropOffInput',
  DropdownButton = 'DropdownButton',
  FormGroup = 'FormGroup',
  Heading = 'Heading',
  Icon = 'Icon',
  Image = 'Image',
  Link = 'Link',
  Loader = 'Loader',
  Modal = 'Modal',
  MultiCheckbox = 'MultiCheckbox',
  MultiRadio = 'MultiRadio',
  Notification = 'Notification',
  NumberInput = 'NumberInput',
  PluginSettingsWrapper = 'PluginSettingsWrapper',
  RadioInput = 'RadioInput',
  Row = 'Row',
  SelectInput = 'SelectInput',
  ShipmentLabelWrapper = 'ShipmentLabelWrapper',
  TabNavButton = 'TabNavButton',
  TabNavButtonWrapper = 'TabNavButtonWrapper',
  TabNavContentWrapper = 'TabNavContentWrapper',
  Table = 'Table',
  TableCol = 'TableCol',
  TableRow = 'TableRow',
  TextInput = 'TextInput',
  TimeInput = 'TimeInput',
  ToggleInput = 'ToggleInput',
}

export const requiredAdminComponentNames = [
  AdminComponent.Box,
  AdminComponent.Button,
  AdminComponent.CheckboxInput,
  AdminComponent.Col,
  AdminComponent.CurrencyInput,
  AdminComponent.DropOffInput,
  AdminComponent.DropdownButton,
  AdminComponent.FormGroup,
  AdminComponent.Heading,
  AdminComponent.Icon,
  AdminComponent.Image,
  AdminComponent.Link,
  AdminComponent.Loader,
  AdminComponent.Modal,
  AdminComponent.MultiCheckbox,
  AdminComponent.MultiRadio,
  AdminComponent.Notification,
  AdminComponent.NumberInput,
  AdminComponent.RadioInput,
  AdminComponent.Row,
  AdminComponent.SelectInput,
  AdminComponent.TabNavButton,
  AdminComponent.Table,
  AdminComponent.TextInput,
  AdminComponent.TimeInput,
  AdminComponent.ToggleInput,
] as const;

export const optionalAdminPlainWrapperComponentNames = [
  AdminComponent.ButtonGroup,
  AdminComponent.PluginSettingsWrapper,
  AdminComponent.TabNavButtonWrapper,
  AdminComponent.TabNavContentWrapper,
  AdminComponent.TableCol,
  AdminComponent.TableRow,
] as const;

export const optionalAdminActionContainerComponentNames = [
  AdminComponent.ConceptBoxWrapper,
  AdminComponent.ShipmentLabelWrapper,
] as const;

export type RequiredAdminComponentName = (typeof requiredAdminComponentNames)[number];

export type OptionalAdminComponentName =
  | (typeof optionalAdminPlainWrapperComponentNames)[number]
  | (typeof optionalAdminActionContainerComponentNames)[number];

export type PrefixedAdminComponent<A extends AdminComponent = AdminComponent> = `${typeof ADMIN_COMPONENT_PREFIX}${A}`;

export type AdminComponentMap = Record<PrefixedAdminComponent<RequiredAdminComponentName>, Component> &
  Partial<Record<PrefixedAdminComponent<OptionalAdminComponentName>, Component>>;

export type ComponentImportFunction = () => Promise<{default: Component}>;

export enum AdminView {
  LoadingPage = 'LoadingPage',
  Modals = 'Modals',
  Notifications = 'Notifications',
  OrderBox = 'OrderBox',
  OrderListItem = 'OrderListItem',
  PluginSettings = 'PluginSettings',
  ProductSettings = 'ProductSettings',
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
