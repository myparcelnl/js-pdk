import {Component} from 'vue';
import {AdminComponent} from '@myparcel-pdk/common';
import {
  runActionContainerTest,
  runButtonTest,
  runCheckboxGroupTest,
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
  runNotificationTest,
  runNumberInputTest,
  runPlainWrapperTest,
  runRadioGroupTest,
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

export type AdminComponentTest = (component: Omit<Component, 'props'>) => void;

export const testMap: Record<AdminComponent, AdminComponentTest> = {
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

  PdkCheckboxGroup: runCheckboxGroupTest,
  PdkRadioGroup: runRadioGroupTest,

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
