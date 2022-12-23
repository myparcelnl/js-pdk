import {ComputedRef, computed} from 'vue';
import {FrontendAction, actions} from '../actions';
import {PdkButtonAction} from '../types';
import {createAction} from './actions';
import {isEnumValue} from '@myparcel/ts-utils';

export const useAction = (action: null | PdkButtonAction | FrontendAction): ComputedRef<null | PdkButtonAction> =>
  computed(() => {
    if (!action) {
      return null;
    }

    if (isEnumValue(action, FrontendAction)) {
      const found = actions.find((item) => item.action === action);

      if (!found) {
        throw new Error(`Action ${action} not found`);
      }

      return createAction(found);
    }

    return createAction(action);
  });
