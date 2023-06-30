import {type Component} from 'vue';
import {type AdminComponent} from '@myparcel-pdk/common';
import {
  runActionContainerTest,
  runBadgeTest,
  runButtonTest,
  runCheckboxGroupTest,
  runCheckboxInputTest,
  runCodeEditorTest,
  runColTest,
  runCurrencyInputTest,
  runDropDownButtonTest,
  runDropOffInputTest,
  runFormGroupTest,
  runHeadingTest,
  runIconTest,
  runImageTest,
  runLinkTest,
  runLoaderTest,
  runModalTest,
  runMultiSelectInputTest,
  runNotificationTest,
  runNumberInputTest,
  runPlainWrapperTest,
  runRadioGroupTest,
  runRadioInputTest,
  runRowTest,
  runSelectInputTest,
  runSettingsDividerTest,
  runTableColTest,
  runTableRowTest,
  runTableTest,
  runTabNavButtonTest,
  runTextAreaTest,
  runTextInputTest,
  runTimeInputTest,
  runToggleInputTest,
  runTriStateInputTest,
} from '../components';

export type AdminComponentTest = (component: Omit<Component, 'props'>) => void;

export const testMap: Record<AdminComponent, AdminComponentTest> = {
  /**
   * Inputs
   */
  CheckboxGroup: runCheckboxGroupTest,
  CheckboxInput: runCheckboxInputTest,
  CodeEditor: runCodeEditorTest,
  CurrencyInput: runCurrencyInputTest,
  DropOffInput: runDropOffInputTest,
  MultiSelectInput: runMultiSelectInputTest,
  NumberInput: runNumberInputTest,
  RadioGroup: runRadioGroupTest,
  RadioInput: runRadioInputTest,
  SelectInput: runSelectInputTest,
  TextArea: runTextAreaTest,
  TextInput: runTextInputTest,
  TimeInput: runTimeInputTest,
  ToggleInput: runToggleInputTest,
  TriStateInput: runTriStateInputTest,

  /**
   * Action containers
   */
  Box: runActionContainerTest,
  ConceptBoxWrapper: runActionContainerTest,
  ShipmentLabelWrapper: runActionContainerTest,

  /**
   * Plain wrappers
   */
  ButtonGroup: runPlainWrapperTest,
  PluginSettingsWrapper: runPlainWrapperTest,
  TabNavButtonWrapper: runPlainWrapperTest,
  TabNavContentWrapper: runPlainWrapperTest,

  /**
   * Layout
   */
  Col: runColTest,
  Row: runRowTest,

  Table: runTableTest,
  TableCol: runTableColTest,
  TableRow: runTableRowTest,

  FormGroup: runFormGroupTest,

  /**
   * Interactive components
   */
  Button: runButtonTest,
  DropdownButton: runDropDownButtonTest,
  Link: runLinkTest,
  Modal: runModalTest,
  TabNavButton: runTabNavButtonTest,

  /**
   * Other
   */
  Badge: runBadgeTest,
  Heading: runHeadingTest,
  Icon: runIconTest,
  Image: runImageTest,
  Loader: runLoaderTest,
  Notification: runNotificationTest,
  SettingsDivider: runSettingsDividerTest,
};
