import {ActionResponse, FrontendAction} from '../consts';
import {ActionContext} from './types';
import {EndpointName} from '@myparcel-pdk/common';
import {executeMutation} from './executeMutation';
import {useQueryStore} from '../../stores';

// eslint-disable-next-line complexity
export async function executeAction<A extends FrontendAction>({
  action,
  instance,
  parameters,
}: ActionContext): Promise<ActionResponse<A>> {
  const queryStore = useQueryStore();

  let response;

  switch (action) {
    case FrontendAction.ORDERS_REFRESH:
      response = (await queryStore.get(EndpointName.GET_ORDERS).refetch()).data;
      break;

    case FrontendAction.ORDERS_EXPORT:
    case FrontendAction.ORDERS_EXPORT_PRINT:
    case FrontendAction.ORDERS_PRINT:
    case FrontendAction.ORDERS_UPDATE:
    case FrontendAction.PLUGIN_SETTINGS_UPDATE:
    case FrontendAction.PRODUCT_SETTINGS_UPDATE:
    case FrontendAction.SHIPMENTS_DELETE:
    case FrontendAction.SHIPMENTS_PRINT:
    case FrontendAction.SHIPMENTS_UPDATE:
      response = await executeMutation({action, parameters, instance});
      break;

    default:
      throw new Error(`Action "${action}" is not found.`);
  }

  // @ts-expect-error todo
  return response;
}
