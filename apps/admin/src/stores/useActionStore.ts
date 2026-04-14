import {ref} from 'vue';
import {defineStore} from 'pinia';
import {type OneOrMore, type PromiseOr, toArray} from '@myparcel-dev/ts-utils';
import {type ActionParameters, type AnyActionDefinition, type ResolvedAction} from '../types';
import {createAction, getActionIdentifier} from '../services';
import {type AdminAction} from '../data';
import {useOrderMode} from '../composables';
import {
  modalCloseAction,
  modalSubmitFormAction,
  ordersEditAction,
  ordersFetchAction,
  ordersUpdateAction,
  STORE_MODE_ACTIONS,
  webhooksCreateAction,
  webhooksDeleteAction,
  webhooksFetchAction,
} from '../actions';

// eslint-disable-next-line max-lines-per-function
export const useActionStore = defineStore('actions', () => {
  const actions = ref<ResolvedAction[]>([]);

  const register = (action: OneOrMore<AnyActionDefinition>) => {
    toArray(action)
      .filter((action) => !get(getActionIdentifier(action)))
      .forEach((action) => {
        const resolvedAction = createAction(action);

        // @ts-expect-error todo
        actions.value.push(resolvedAction);
      });
  };

  const get = (action: string | AdminAction): ResolvedAction | undefined => {
    return actions.value.find((a) => a.id === action);
  };

  const dispatch = <A extends string | AdminAction>(action: A, parameters?: ActionParameters<A>): PromiseOr<void> => {
    const resolvedAction = get(action);

    if (!resolvedAction) {
      throw new Error(`Action ${action} is not registered.`);
    }

    return resolvedAction.handler(parameters) as PromiseOr<void>;
  };

  return {
    get,

    register,

    dispatch,

    registerOrderActions: () => {
      const orderMode = useOrderMode();

      register([ordersEditAction, ordersFetchAction, ordersUpdateAction, ...STORE_MODE_ACTIONS[orderMode.value]]);
    },

    registerModalActions: () => {
      register([modalCloseAction, modalSubmitFormAction]);
    },

    registerWebhookActions: () => {
      register([webhooksCreateAction, webhooksDeleteAction, webhooksFetchAction]);
    },
  };
});
