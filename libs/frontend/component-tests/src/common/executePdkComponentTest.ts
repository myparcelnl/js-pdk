/* eslint-disable no-magic-numbers */
import {
  runPdkAlertTest,
  runPdkButtonTest,
  runPdkCardTest,
  runPdkDropDownButtonTest,
  runPdkIconTest,
  runPdkInputTest,
  runPdkSelectTest,
  runPdkTableTest,
} from '../tests';
import {Component} from 'vue';
import {PdkComponentName} from '@myparcel-pdk/frontend-shared';
import {describe} from 'vitest';

export type ComponentTest = (component: Omit<Component, 'props'>, ...args: unknown[]) => void;

const testMap: Partial<Record<PdkComponentName, ComponentTest>> = {
  PdkAlert: runPdkAlertTest,
  PdkButton: runPdkButtonTest,
  PdkCard: runPdkCardTest,
  PdkDropdownButton: runPdkDropDownButtonTest,
  PdkIcon: runPdkIconTest,
  PdkInput: runPdkInputTest,
  PdkSelect: runPdkSelectTest,
  PdkTable: runPdkTableTest,
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
