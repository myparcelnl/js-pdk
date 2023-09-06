import {AdminComponent} from './data';

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
