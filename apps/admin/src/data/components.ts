export enum AdminComponent {
  Badge = 'Badge',
  Box = 'Box',
  Button = 'Button',
  ButtonGroup = 'ButtonGroup',
  CheckboxGroup = 'CheckboxGroup',
  CheckboxInput = 'CheckboxInput',
  CodeEditor = 'CodeEditor',
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
  MultiSelectInput = 'MultiSelectInput',
  Notification = 'Notification',
  NumberInput = 'NumberInput',
  PluginSettingsWrapper = 'PluginSettingsWrapper',
  RadioGroup = 'RadioGroup',
  RadioInput = 'RadioInput',
  Row = 'Row',
  SelectInput = 'SelectInput',
  SettingsDivider = 'SettingsDivider',
  ShipmentLabelWrapper = 'ShipmentLabelWrapper',
  ShippingMethodsInput = 'ShippingMethodsInput',
  TabNavButton = 'TabNavButton',
  TabNavButtonWrapper = 'TabNavButtonWrapper',
  TabNavContentWrapper = 'TabNavContentWrapper',
  Table = 'Table',
  TableCol = 'TableCol',
  TableRow = 'TableRow',
  TextArea = 'TextArea',
  TextInput = 'TextInput',
  TimeInput = 'TimeInput',
  ToggleInput = 'ToggleInput',
  TriStateInput = 'TriStateInput',
}

export const requiredAdminComponentNames = [
  AdminComponent.Box,
  AdminComponent.Button,
  AdminComponent.CheckboxGroup,
  AdminComponent.CheckboxInput,
  AdminComponent.CodeEditor,
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
  AdminComponent.MultiSelectInput,
  AdminComponent.Notification,
  AdminComponent.NumberInput,
  AdminComponent.RadioGroup,
  AdminComponent.RadioInput,
  AdminComponent.Row,
  AdminComponent.SelectInput,
  AdminComponent.TabNavButton,
  AdminComponent.Table,
  AdminComponent.TextArea,
  AdminComponent.TextInput,
  AdminComponent.TimeInput,
  AdminComponent.ToggleInput,
  AdminComponent.TriStateInput,
] as const;

export const optionalAdminComponentNames = [AdminComponent.ShippingMethodsInput] as const;

export const optionalAdminPlainWrapperComponentNames = [
  AdminComponent.Badge,
  AdminComponent.ButtonGroup,
  AdminComponent.PluginSettingsWrapper,
  AdminComponent.SettingsDivider,
  AdminComponent.TabNavButtonWrapper,
  AdminComponent.TabNavContentWrapper,
  AdminComponent.TableCol,
  AdminComponent.TableRow,
] as const;

export const optionalAdminActionContainerComponentNames = [
  AdminComponent.ConceptBoxWrapper,
  AdminComponent.ShipmentLabelWrapper,
] as const;

export const allAdminComponentNames = [
  ...requiredAdminComponentNames,
  ...optionalAdminComponentNames,
  ...optionalAdminPlainWrapperComponentNames,
  ...optionalAdminActionContainerComponentNames,
] as const;
