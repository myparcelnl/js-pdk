import {ActionResponse, FrontendAction} from '../consts';
import {ActionContext} from './types';
import {EndpointName} from '@myparcel-pdk/common';
import {executeMutation} from './executeMutation';
import {useQueryStore} from '../../stores';

// eslint-disable-next-line complexity
export async function executeAction<A extends FrontendAction>({
  action,
  parameters,
}: ActionContext): Promise<ActionResponse<A>> {
  const queryStore = useQueryStore();

  let response;

  switch (action) {
    case FrontendAction.ORDER_REFRESH:
      response = (await queryStore.get(EndpointName.GET_ORDERS).refetch()).data;
      break;

    case FrontendAction.ORDER_EXPORT:
    case FrontendAction.ORDER_EXPORT_PRINT:
    case FrontendAction.ORDER_PRINT:
    case FrontendAction.ORDER_UPDATE:
    case FrontendAction.PLUGIN_SETTINGS_UPDATE:
    case FrontendAction.PRODUCT_SETTINGS_UPDATE:
    case FrontendAction.SHIPMENTS_DELETE:
    case FrontendAction.SHIPMENTS_PRINT:
    case FrontendAction.SHIPMENTS_REFRESH:
      response = await executeMutation({action, parameters});
      break;

    default:
      throw new Error(`Action "${action}" is not found.`);
  }

  // @ts-expect-error todo
  return response;
}
