/* eslint-disable no-magic-numbers */
import {Component} from 'vue';
import {PdkComponentName} from '@myparcel-pdk/frontend-shared';
import {createPdkAlertTest} from './createPdkAlertTest';
import {createPdkButtonTest} from './createPdkButtonTest';
import {createPdkCardTest} from './createPdkCardTest';
import {createPdkIconTest} from './createPdkIconTest';
import {createPdkInputTest} from './createPdkInputTest';
import {createPdkSelectTest} from './createPdkSelectTest';
import {describe} from 'vitest';

export type PdkComponentTest = (name: PdkComponentName, component: Omit<Component, 'props'>) => void;

export const executePdkComponentTest = (name: PdkComponentName, component: Omit<Component, 'props'>): void => {
  switch (name) {
    // case 'PdkAccordion':
    //   break;

    case 'PdkAlert':
      createPdkAlertTest(name, component);
      break;

    case 'PdkButton':
      createPdkButtonTest(name, component);
      break;

    case 'PdkCard':
      createPdkCardTest(name, component);
      break;

    // case 'PdkCheckbox':
    //   break;

    // case 'PdkDropdownButton':
    //   break;

    // case 'PdkFormGroup':
    //   break;

    case 'PdkIcon':
      createPdkIconTest(name, component);
      break;

    case 'PdkInput':
      createPdkInputTest(name, component);
      break;

    // case 'PdkModal':
    //   break;

    // case 'PdkMultiCheckbox':
    //   break;

    // case 'PdkRadio':
    //   break;

    case 'PdkSelect':
      createPdkSelectTest(name, component);
      break;

    // case 'PdkTable':
    //   break;

    // case 'PdkTableCol':
    //   break;

    // case 'PdkTableRow':
    //   break;

    default:
      describe.skip(name, () => {
        // Empty
      });
  }
};
