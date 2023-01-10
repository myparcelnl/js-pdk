/* eslint-disable no-magic-numbers */
import {Component} from 'vue';
import {PdkComponentName} from '@myparcel-pdk/common';
import {describe} from 'vitest';
import {runCommonComponentTests} from '../common';
import {testMap} from './testMap';

export const executePdkComponentTest = (name: PdkComponentName, component: Omit<Component, 'props'>): void => {
  const test = testMap[name];

  if (!test) {
    // eslint-disable-next-line no-console
    console.warn(`No test found for component: ${name}`);
    return;
  }

  describe(name, () => {
    runCommonComponentTests(component);
    test(component);
  });
};
