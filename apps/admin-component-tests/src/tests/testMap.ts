import {type Component} from 'vue';
import {AdminComponent} from '@myparcel-pdk/admin';
import {
  runBadgeTest,
  runBoxTest,
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
  runShippingMethodsInputTest,
  runTableColTest,
  runTableRowTest,
  runTableTest,
  runTabNavButtonTest,
  runTextAreaTest,
  runTextInputTest,
  runTimeInputTest,
  runToggleInputTest,
} from '../components';

export type AdminComponentTest = (component: Omit<Component, 'props'>) => void;

export const testMap: Readonly<Record<AdminComponent, AdminComponentTest>> = Object.freeze({
  /**
   * Inputs
   */
  [AdminComponent.CheckboxGroup]: runCheckboxGroupTest,
  [AdminComponent.CheckboxInput]: runCheckboxInputTest,
  [AdminComponent.CodeEditor]: runCodeEditorTest,
  [AdminComponent.CurrencyInput]: runCurrencyInputTest,
  [AdminComponent.DropOffInput]: runDropOffInputTest,
  [AdminComponent.MultiSelectInput]: runMultiSelectInputTest,
  [AdminComponent.NumberInput]: runNumberInputTest,
  [AdminComponent.RadioGroup]: runRadioGroupTest,
  [AdminComponent.RadioInput]: runRadioInputTest,
  [AdminComponent.SelectInput]: runSelectInputTest,
  [AdminComponent.ShippingMethodsInput]: runShippingMethodsInputTest,
  [AdminComponent.TextArea]: runTextAreaTest,
  [AdminComponent.TextInput]: runTextInputTest,
  [AdminComponent.TimeInput]: runTimeInputTest,
  [AdminComponent.ToggleInput]: runToggleInputTest,
  /**
   * @TODO: fix test for TriStateInput
   */
  [AdminComponent.TriStateInput]: () => undefined,

  /**
   * Plain wrappers
   */
  [AdminComponent.ButtonGroup]: runPlainWrapperTest,
  [AdminComponent.ConceptBoxWrapper]: runPlainWrapperTest,
  [AdminComponent.PluginSettingsWrapper]: runPlainWrapperTest,
  [AdminComponent.ShipmentLabelWrapper]: runPlainWrapperTest,
  [AdminComponent.TabNavButtonWrapper]: runPlainWrapperTest,
  [AdminComponent.TabNavContentWrapper]: runPlainWrapperTest,

  /**
   * Layout
   */
  [AdminComponent.Box]: runBoxTest,
  [AdminComponent.Col]: runColTest,
  [AdminComponent.Row]: runRowTest,

  [AdminComponent.Table]: runTableTest,
  [AdminComponent.TableCol]: runTableColTest,
  [AdminComponent.TableRow]: runTableRowTest,

  [AdminComponent.FormGroup]: runFormGroupTest,

  /**
   * Interactive components
   */
  [AdminComponent.Button]: runButtonTest,
  [AdminComponent.DropdownButton]: runDropDownButtonTest,
  [AdminComponent.Link]: runLinkTest,
  [AdminComponent.Modal]: runModalTest,
  [AdminComponent.TabNavButton]: runTabNavButtonTest,

  /**
   * Other
   */
  [AdminComponent.Badge]: runBadgeTest,
  [AdminComponent.Heading]: runHeadingTest,
  [AdminComponent.Icon]: runIconTest,
  [AdminComponent.Image]: runImageTest,
  [AdminComponent.Loader]: runLoaderTest,
  [AdminComponent.Notification]: runNotificationTest,
  [AdminComponent.SettingsDivider]: runSettingsDividerTest,
});
