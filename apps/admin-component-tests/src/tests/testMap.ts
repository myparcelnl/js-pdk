import {
  runActionContainerTest,
  runButtonTest,
  runCheckboxInputTest,
  runColTest,
  runCurrencyInputTest,
  runDropDownButtonTest,
  runDropOffInputTest,
  runFormGroupTest,
  runHeadingTest,
  runIconTest,
  runImageTest,
  runLinkTest,
  runModalTest,
  runMultiCheckboxTest,
  runMultiRadioTest,
  runNotificationTest,
  runNumberInputTest,
  runPlainWrapperTest,
  runRadioInputTest,
  runRowTest,
  runSelectInputTest,
  runTabNavButtonTest,
  runTableColTest,
  runTableRowTest,
  runTableTest,
  runTextInputTest,
  runTimeInputTest,
  runToggleInputTest,
} from '../components';
import {AdminComponentName} from '@myparcel-pdk/common/src';
import {Component} from 'vue';

export type AdminComponentTest = (component: Omit<Component, 'props'>) => void;

export const testMap: Record<AdminComponentName, AdminComponentTest> = {
  /**
   * Inputs
   */
  PdkCheckboxInput: runCheckboxInputTest,
  PdkCurrencyInput: runCurrencyInputTest,
  PdkDropOffInput: runDropOffInputTest,
  PdkNumberInput: runNumberInputTest,
  PdkRadioInput: runRadioInputTest,
  PdkSelectInput: runSelectInputTest,
  PdkTextInput: runTextInputTest,
  PdkTimeInput: runTimeInputTest,
  PdkToggleInput: runToggleInputTest,

  PdkMultiCheckbox: runMultiCheckboxTest,
  PdkMultiRadio: runMultiRadioTest,

  /**
   * Action containers
   */
  PdkBox: runActionContainerTest,
  PdkConceptBoxWrapper: runActionContainerTest,
  PdkShipmentLabelWrapper: runActionContainerTest,

  /**
   * Plain wrappers
   */
  PdkButtonGroup: runPlainWrapperTest,
  PdkPluginSettingsWrapper: runPlainWrapperTest,
  PdkTabNavButtonWrapper: runPlainWrapperTest,
  PdkTabNavContentWrapper: runPlainWrapperTest,

  /**
   * Layout
   */
  PdkCol: runColTest,
  PdkRow: runRowTest,

  PdkTable: runTableTest,
  PdkTableCol: runTableColTest,
  PdkTableRow: runTableRowTest,

  PdkFormGroup: runFormGroupTest,

  /**
   * Interactive components
   */
  PdkButton: runButtonTest,
  PdkDropdownButton: runDropDownButtonTest,
  PdkLink: runLinkTest,
  PdkModal: runModalTest,
  PdkTabNavButton: runTabNavButtonTest,

  /**
   * Other
   */
  PdkHeading: runHeadingTest,
  PdkIcon: runIconTest,
  PdkImage: runImageTest,
  PdkNotification: runNotificationTest,
};
