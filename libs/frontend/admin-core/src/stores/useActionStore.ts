import {UnwrapNestedRefs, ref} from 'vue';
import {defineStore} from 'pinia';
import {OneOrMore, PromiseOr, toArray} from '@myparcel/ts-utils';
import {ActionParameters, AdminAction, AnyAdminAction, ResolvedAction} from '../types';
import {createAction, getActionIdentifier} from '../services';
import {usePluginSettings} from '../composables';
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

// eslint-disable-next-line max-lines-per-function
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
  ): PromiseOr<void> => {
    const resolvedAction = get(action);

    if (!resolvedAction) {
      throw new Error(`Action ${action} is not registered.`);
    }

    return resolvedAction.handler(parameters);
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
