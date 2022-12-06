/* eslint-disable no-case-declarations */
import {ActionParameters, PdkAction} from '../../data';
import {getExportContext} from './getExportContext';

export const beforeAction = async <A extends PdkAction>(
  action: A,
  parameters?: Partial<ActionParameters<A>>,
): Promise<ActionParameters<A>> => {
  switch (action) {
    case PdkAction.ORDER_EXPORT:
    case PdkAction.ORDER_EXPORT_PRINT:
    case PdkAction.ORDER_UPDATE:
      const {orderIds, form} = getExportContext();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      parameters.orderIds = orderIds;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      parameters.form = form;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      parameters.print = action === PdkAction.ORDER_EXPORT_PRINT;
      break;
  }

  return parameters as ActionParameters<A>;
};
