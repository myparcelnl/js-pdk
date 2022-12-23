/* eslint-disable no-magic-numbers */
import {
  runButtonGroupTest,
  runButtonTest,
  runCardTest,
  runCheckboxInputTest,
  runColTest,
  runCurrencyInputTest,
  runDropDownButtonTest,
  runFormGroupTest,
  runIconTest,
  runImageTest,
  runLinkTest,
  runModalTest,
  runMultiCheckboxTest,
  runMultiRadioTest,
  runNotificationTest,
  runNumberInputTest,
  runPluginSettingsWrapperTest,
  runRadioInputTest,
  runRowTest,
  runSelectInputTest,
  runTableColTest,
  runTableRowTest,
  runTableTest,
  runTextInputTest,
  runToggleInputTest,
} from './tests';
import {Component} from 'vue';
import {PdkComponentName} from '@myparcel-pdk/common';
import {describe} from 'vitest';

export type ComponentTest = (component: Omit<Component, 'props'>, ...args: unknown[]) => void;

const testMap: Record<PdkComponentName, ComponentTest> = {
  PdkNotification: runNotificationTest,
  PdkButton: runButtonTest,
  PdkButtonGroup: runButtonGroupTest,
  PdkCard: runCardTest,
  PdkCheckboxInput: runCheckboxInputTest,
  PdkCol: runColTest,
  PdkCurrencyInput: runCurrencyInputTest,
  PdkDropdownButton: runDropDownButtonTest,
  PdkFormGroup: runFormGroupTest,
  PdkIcon: runIconTest,
  PdkImage: runImageTest,
  PdkLink: runLinkTest,
  PdkModal: runModalTest,
  PdkMultiCheckbox: runMultiCheckboxTest,
  PdkMultiRadio: runMultiRadioTest,
  PdkNumberInput: runNumberInputTest,
  PdkPluginSettingsWrapper: runPluginSettingsWrapperTest,
  PdkRadioInput: runRadioInputTest,
  PdkRow: runRowTest,
  PdkSelectInput: runSelectInputTest,
  PdkTable: runTableTest,
  PdkTableCol: runTableColTest,
  PdkTableRow: runTableRowTest,
  PdkTextInput: runTextInputTest,
  PdkToggleInput: runToggleInputTest,
};

export const executePdkComponentTest = (name: PdkComponentName, component: Omit<Component, 'props'>): void => {
  const test = testMap[name];

  if (!test) {
    // eslint-disable-next-line no-console
    console.warn(`No test found for component: ${name}`);
    return;
  }

  describe(name, () => {
    test(component);
  });
};
