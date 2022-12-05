import {ActionParameters, ActionResponse, PdkAction} from '../../data';
import {deleteLabels, exportOrders, refreshShipments, updateOrders} from '../../actions';
import {afterAction} from './afterAction';
import {beforeAction} from './beforeAction';

type DoAction = <A extends PdkAction>(
  action: A,
  parameters: Partial<ActionParameters<A>>,
) => Promise<ActionResponse<A>>;

export const doAction: DoAction = async (action, parameters) => {
  let response;

  console.trace('doAction', action, parameters);

  const resolvedParameters = await beforeAction(action, parameters);

  switch (action) {
    case PdkAction.ORDER_EXPORT:
    case PdkAction.ORDER_EXPORT_PRINT:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      response = await exportOrders({...resolvedParameters, print: PdkAction.ORDER_EXPORT_PRINT === action});
      break;

    case PdkAction.SHIPMENT_REFRESH:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      response = await refreshShipments(resolvedParameters);
      break;

    case PdkAction.ORDER_UPDATE:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      response = await updateOrders(resolvedParameters);
      break;

    case PdkAction.LABEL_DELETE:
      response = await deleteLabels(resolvedParameters);
      break;

    default:
      throw new Error(`Action "${action}" is not found.`);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return afterAction(action, resolvedParameters, response);
};
