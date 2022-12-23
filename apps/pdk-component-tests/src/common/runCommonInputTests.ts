import {Component} from 'vue';
import {runHasPropTest} from './runHasPropTest';

export const runCommonInputTests = <C extends Omit<Component, 'props'>>(component: C): void => {
  runHasPropTest(component, 'disabled', true);
};
