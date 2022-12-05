import {ActionParameters, PdkAction} from '../../data';
import {getExportContext} from './getExportContext';

export const beforeAction = async <A extends PdkAction>(action: A, parameters: Partial<ActionParameters<A>>) => {
  switch (action) {
    case PdkAction.ORDER_EXPORT:
    case PdkAction.ORDER_EXPORT_PRINT:
    case PdkAction.ORDER_UPDATE:
      const {orderId, form} = getExportContext();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      parameters.orderIds = orderId;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      parameters.form = form;
      break;
  }

  return parameters as ActionParameters<A>;
};
