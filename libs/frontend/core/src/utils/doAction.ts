import {ActionParameters, ActionResponse, FrontendAction} from '../actions';
import {EndpointName} from '@myparcel-pdk/common';
import {afterAction} from './afterAction';
import {beforeAction} from './beforeAction';
import {useQueryStore} from '../stores';

export const doAction = async <A extends FrontendAction>(
  action: A,
  parameters?: Partial<ActionParameters<A>>,
): Promise<ActionResponse<A>> => {
  let response;
  const queryStore = useQueryStore();

  console.trace('doAction', action, parameters);
  const resolvedParameters = await beforeAction<A>(action, parameters);

  switch (action) {
    case FrontendAction.ORDER_EXPORT:
    case FrontendAction.ORDER_EXPORT_PRINT:
      response = await queryStore.get(EndpointName.EXPORT_ORDERS).mutateAsync(resolvedParameters);
      break;

    case FrontendAction.ORDER_PRINT:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      response = await queryStore.get(EndpointName.PRINT_ORDERS).mutateAsync(resolvedParameters);
      break;

    case FrontendAction.ORDER_UPDATE:
      response = await queryStore.get(EndpointName.UPDATE_ORDERS).mutateAsync(resolvedParameters);
      break;

    case FrontendAction.ORDER_REFRESH:
      response = (await queryStore.get(EndpointName.GET_ORDERS).refetch()).data;
      break;

    case FrontendAction.SHIPMENT_PRINT:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      response = await queryStore.get(EndpointName.PRINT_SHIPMENTS).mutateAsync(resolvedParameters);
      break;

    case FrontendAction.SHIPMENT_REFRESH:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      response = await queryStore.get(EndpointName.REFRESH_SHIPMENTS).mutateAsync(resolvedParameters);
      break;

    case FrontendAction.SHIPMENT_DELETE:
      response = await queryStore.get(EndpointName.DELETE_SHIPMENTS).mutateAsync(resolvedParameters);
      break;

    default:
      throw new Error(`Action "${action}" is not found.`);
  }

  if (!response) {
    throw new Error(`Action "${action}" failed.`);
  }

  return afterAction(action, resolvedParameters, response);
};
