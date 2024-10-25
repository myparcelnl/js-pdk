import {type Component} from 'vue';
import {AdminComponent} from '@myparcel-pdk/admin';
import {runTextAreaTest} from '../components/runTextAreaTest';
import {runTableTest} from '../components/runTableTest';
import {runTableRowTest} from '../components/runTableRowTest';
import {runTableColTest} from '../components/runTableColTest';
import {runShippingMethodsInputTest} from '../components/runShippingMethodsInputTest';
import {runSettingsDividerTest} from '../components/runSettingsDividerTest';
import {runSelectInputTest} from '../components/runSelectInputTest';
import {runRowTest} from '../components/runRowTest';
import {runRadioInputTest} from '../components/runRadioInputTest';
import {runRadioGroupTest} from '../components/runRadioGroupTest';
import {runPlainWrapperTest} from '../components/runPlainWrapperTest';
import {runNumberInputTest} from '../components/runNumberInputTest';
import {runNotificationTest} from '../components/runNotificationTest';
import {runMultiSelectInputTest} from '../components/runMultiSelectInputTest';
import {runModalTest} from '../components/runModalTest';
import {runLoaderTest} from '../components/runLoaderTest';
import {runLinkTest} from '../components/runLinkTest';
import {runImageTest} from '../components/runImageTest';
import {runIconTest} from '../components/runIconTest';
import {runHeadingTest} from '../components/runHeadingTest';
import {runFormGroupTest} from '../components/runFormGroupTest';
import {runDropOffInputTest} from '../components/runDropOffInputTest';
import {runDropDownButtonTest} from '../components/runDropDownButtonTest';
import {runCurrencyInputTest} from '../components/runCurrencyInputTest';
import {runColTest} from '../components/runColTest';
import {runCodeEditorTest} from '../components/runCodeEditorTest';
import {runCheckboxInputTest} from '../components/runCheckboxInputTest';
import {runCheckboxGroupTest} from '../components/runCheckboxGroupTest';
import {runButtonTest} from '../components/runButtonTest';
import {runBoxTest} from '../components/runBoxTest';
import {runBadgeTest} from '../components/runBadgeTest';
import {runTabNavButtonTest} from '../components/runTabNavButtonTest';
import {runTextInputTest} from '../components/runTextInputTest';
import {runTimeInputTest} from '../components/runTimeInputTest';
import {runToggleInputTest} from '../components/runToggleInputTest';

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
