import {ref} from 'vue';
import {defineStore} from 'pinia';
import {type OneOrMore, type PromiseOr, toArray} from '@myparcel/ts-utils';
import {type AnyActionDefinition, type ResolvedAction} from '../types/actions.types';
import {type ActionParameters} from '../types/actions/parameters.types';
import {getActionIdentifier} from '../services/actions/getActionIdentifier';
import {createAction} from '../services/actions/createAction';
import {type AdminAction} from '../data/constants';
import {usePluginSettings} from '../composables/context/usePluginSettings';
import {webhooksCreateAction, webhooksDeleteAction, webhooksFetchAction} from '../actions/definitions/webhooks';
import {
  shipmentsDeleteAction,
  shipmentsExportReturnAction,
  shipmentsPrintAction,
  shipmentsUpdateAction,
} from '../actions/definitions/shipments';
import {
  orderExportAction,
  orderExportToShipmentsAction,
  ordersEditAction,
  ordersExportPrintShipmentsAction,
  ordersFetchAction,
  ordersPrintAction,
  ordersUpdateAction,
  orderViewInBackofficeAction,
} from '../actions/definitions/orders';
import {modalCloseAction, modalSubmitFormAction} from '../actions/definitions/modal';

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
      const pluginSettings = usePluginSettings();

      register([
        ordersEditAction,
        ordersFetchAction,
        ordersPrintAction,
        ordersUpdateAction,
        ...(pluginSettings.order.orderMode
          ? [orderExportAction, orderViewInBackofficeAction]
          : [
              orderExportToShipmentsAction,
              ordersExportPrintShipmentsAction,
              shipmentsExportReturnAction,
              shipmentsExportReturnAction,
              shipmentsDeleteAction,
              shipmentsUpdateAction,
              shipmentsPrintAction,
            ]),
      ]);
    },

    registerModalActions: () => {
      register([modalCloseAction, modalSubmitFormAction]);
    },

    registerWebhookActions: () => {
      register([webhooksCreateAction, webhooksDeleteAction, webhooksFetchAction]);
    },
  };
});
