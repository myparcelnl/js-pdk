import {ActionParameters, ActionResponse, PdkAction} from '../../data';
import {QueryId, useQueryStore} from '../../stores';
import {afterAction} from './afterAction';
import {beforeAction} from './beforeAction';

type DoAction = <A extends PdkAction>(
  action: A,
  parameters?: Partial<ActionParameters<A>>,
) => Promise<ActionResponse<A>>;

export const doAction: DoAction = async (action, parameters) => {
  let response;
  const queryStore = useQueryStore();

  console.trace('doAction', action, parameters);

  const resolvedParameters = await beforeAction(action, parameters);

  switch (action) {
    case PdkAction.ORDER_EXPORT:
    case PdkAction.ORDER_EXPORT_PRINT:
      response = await queryStore
        .get(QueryId.EXPORT_ORDERS)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .mutateAsync(resolvedParameters);
      break;

    case PdkAction.SHIPMENT_REFRESH:
      response = (await queryStore.get(QueryId.ORDER).refetch()).data;
      break;

    case PdkAction.ORDER_UPDATE:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      response = await queryStore.get(QueryId.UPDATE_ORDERS).mutateAsync(resolvedParameters);
      break;

    case PdkAction.LABEL_DELETE:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      response = await queryStore.get(QueryId.DELETE_LABELS).mutateAsync(resolvedParameters);
      break;

    default:
      throw new Error(`Action "${action}" is not found.`);
  }

  if (!response) {
    throw new Error(`Action "${action}" failed.`);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return afterAction(action, resolvedParameters, response);
};
