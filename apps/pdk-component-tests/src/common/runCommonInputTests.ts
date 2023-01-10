import {Component, ref} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {runHasPropTest} from './runHasPropTest';

export const runCommonInputTests = <C extends Omit<Component, 'props'>>(component: C): void => {
  const element = {
    ref: ref(),
    name: 'test',
    component: 'input',
  } as InteractiveElementInstance;

  runHasPropTest(component, 'element', element);
};
