import {ComputedRef, computed} from 'vue';
import {FrontendAction, actions} from '../data';
import {PdkButtonAction} from '../types';
import {createAction} from './actions';
import {isEnumValue} from '@myparcel/ts-utils';

export const useAction = (action: PdkButtonAction | FrontendAction): ComputedRef<Partial<PdkButtonAction>> =>
  computed(() => {
    if (isEnumValue(action, FrontendAction)) {
      const found = actions.find((item) => item.action === action);

      if (!found) {
        throw new Error(`Action ${action} not found`);
      }

      return createAction(found);
    }

    return createAction(action);
  });
