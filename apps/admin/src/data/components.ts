export enum AdminComponent {
  /**
   * @see BadgeProps
   */
  Badge = 'Badge',

  /**
   * Used to wrap content in a block.
   *
   * @see BoxProps
   */
  Box = 'Box',

  /**
   * This component is used to render a button. The button can be used to trigger an action. The button can have
   * multiple icons, a label and various sizes. The button can be disabled.
   *
   * @see ButtonProps
   */
  Button = 'Button',

  /**
   * @see ButtonGroupProps
   */
  ButtonGroup = 'ButtonGroup',

  /**
   * @see CheckboxGroupProps
   */
  CheckboxGroup = 'CheckboxGroup',

  /**
   * @see CheckboxInputProps
   */
  CheckboxInput = 'CheckboxInput',

  /**
   * @see CodeEditorProps
   */
  CodeEditor = 'CodeEditor',

  /**
   * @see ColProps
   */
  Col = 'Col',

  /**
   * @see ConceptBoxWrapperProps
   */
  ConceptBoxWrapper = 'ConceptBoxWrapper',

  /**
   * @see CurrencyInputProps
   */
  CurrencyInput = 'CurrencyInput',

  /**
   * @see DropOffInputProps
   */
  DropOffInput = 'DropOffInput',

  /**
   * The dropdown button is a button that can be clicked to open a dropdown menu. The dropdown menu can contain multiple
   * items.
   *
   * @see DropdownButtonProps
   */
  DropdownButton = 'DropdownButton',

  /**
   * The form group is used to render a label and a form element.
   *
   * @see FormGroupProps
   */
  FormGroup = 'FormGroup',

  /**
   * @see HeadingProps
   */
  Heading = 'Heading',

  /**
   * @see IconProps
   */
  Icon = 'Icon',

  /**
   * @see ImageProps
   */
  Image = 'Image',

  /**
   * This component is used to render a link. The link can be used to trigger an action.
   *
   * @see LinkProps
   */
  Link = 'Link',

  /**
   * @see LoaderProps
   */
  Loader = 'Loader',

  /**
   * @see ModalProps
   */
  Modal = 'Modal',

  /**
   * A multi-select box. Renders a list of options which each have their own value. Allows multiple options to be selected.
   *
   * @see MultiSelectInputProps
   */
  MultiSelectInput = 'MultiSelectInput',

  /**
   * @see NotificationProps
   */
  Notification = 'Notification',

  /**
   * @see NumberInputProps
   */
  NumberInput = 'NumberInput',

  /**
   * @see PluginSettingsWrapperProps
   */
  PluginSettingsWrapper = 'PluginSettingsWrapper',
  /**
   * @see RadioGroupProps
   */
  RadioGroup = 'RadioGroup',

  /**
   * @see RadioInputProps
   */
  RadioInput = 'RadioInput',

  /**
   * Table row.
   *
   * @see RowProps
   */
  Row = 'Row',

  /**
   * A select element. Renders a list of options which each have their own value.
   *
   * @see SelectInputProps
   */
  SelectInput = 'SelectInput',

  /**
   * @see SettingsDividerProps
   */
  SettingsDivider = 'SettingsDivider',

  /**
   * @see ShipmentLabelWrapperProps
   */
  ShipmentLabelWrapper = 'ShipmentLabelWrapper',

  /**
   * @see ShippingMethodsInputProps
   */
  ShippingMethodsInput = 'ShippingMethodsInput',

  /**
   * @see TabNavButtonProps
   */
  TabNavButton = 'TabNavButton',

  /**
   * @see TabNavButtonWrapperProps
   */
  TabNavButtonWrapper = 'TabNavButtonWrapper',

  /**
   * @see TabNavContentWrapperProps
   */
  TabNavContentWrapper = 'TabNavContentWrapper',

  /**
   * A table component that can be used to render data via slots.
   *
   * @see TableProps
   */
  Table = 'Table',

  /**
   * @see TableColProps
   */
  TableCol = 'TableCol',

  /**
   * @see TableRowProps
   */
  TableRow = 'TableRow',

  /**
   * @see TextAreaProps
   */
  TextArea = 'TextArea',

  /**
   * @see TextInputProps
   */
  TextInput = 'TextInput',

  /**
   * @see TimeInputProps
   */
  TimeInput = 'TimeInput',

  /**
   * @see ToggleInputProps
   */
  ToggleInput = 'ToggleInput',

  /**
   * @see TriStateInputProps
   */
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
