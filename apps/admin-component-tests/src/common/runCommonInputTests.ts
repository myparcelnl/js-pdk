import {Component, ref} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder/src';
import {PartialComponentTest} from '../types';
import {runHasPropTest} from './runHasPropTest';

export const runCommonInputTests: PartialComponentTest = <C extends Omit<Component, 'props'>>(component: C): void => {
  const element = {
    ref: ref(),
    name: 'test',
    component: 'input',
  } as InteractiveElementInstance;

  runHasPropTest(component, {}, 'element', element);
};
