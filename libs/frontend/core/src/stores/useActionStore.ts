import {ActionParameters, AdminAction, AnyAdminAction, ResolvedAction} from '../types';
import {OneOrMore, toArray} from '@myparcel/ts-utils';
import {UnwrapNestedRefs, ref} from 'vue';
import {createAction, getActionIdentifier} from '../services';
import {
  modalCloseAction,
  modalSubmitFormAction,
  orderExportAction,
  orderExportToShipmentsAction,
  orderViewInBackofficeAction,
  ordersEditAction,
  ordersExportPrintShipmentsAction,
  ordersFetchAction,
  ordersPrintAction,
  ordersUpdateAction,
  shipmentsDeleteAction,
  shipmentsExportReturnAction,
  shipmentsPrintAction,
  shipmentsUpdateAction,
  webhooksCreateAction,
  webhooksDeleteAction,
  webhooksFetchAction,
} from '../actions';
import {defineStore} from 'pinia';
import {usePluginSettings} from '../composables';

export const useActionStore = defineStore('actions', () => {
  const actions = ref<ResolvedAction[]>([]);

  const register = (action: OneOrMore<AnyAdminAction>) => {
    toArray(action)
      .filter((action) => !get(getActionIdentifier(action)))
      .forEach((action) => {
        const resolvedAction = createAction(action);

        // @ts-expect-error todo
        actions.value.push(resolvedAction);
      });
  };

  const get = (action: string | AdminAction): UnwrapNestedRefs<ResolvedAction | undefined> => {
    return actions.value.find((a) => a.id === action);
  };

  const dispatch = <A extends string | AdminAction>(
    action: A,
    parameters?: A extends AdminAction ? ActionParameters<A> : Record<string, unknown>,
  ): void => {
    const resolvedAction = get(action);

    if (!resolvedAction) {
      throw new Error(`Action ${action} is not registered.`);
    }

    void resolvedAction.handler(parameters);
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
        ...(pluginSettings.general.orderMode
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
