import {ActionContextWithResponse, ActionResponse, FrontendAction, doAction, printActions} from '../index';
import {downloadPdf} from '../../services';
import {generateLabelFilename} from '../../utils';

export const afterPrintAction = async <A extends (typeof printActions)[number]>({
  action,
  parameters,
  response,
  instance,
}: ActionContextWithResponse<A>): Promise<ActionResponse<A>> => {
  instance.logger?.debug('Parameters', parameters, response);

  // @ts-expect-error todo
  await downloadPdf(response.url, generateLabelFilename(parameters));

  if (action === FrontendAction.ORDERS_EXPORT_PRINT || action === FrontendAction.ORDERS_PRINT) {
    // @ts-expect-error todo
    void doAction({action: FrontendAction.ORDERS_UPDATE, parameters: {orderIds: parameters?.orderIds}, instance});
  }

  if (action === FrontendAction.SHIPMENTS_PRINT) {
    void doAction({
      action: FrontendAction.SHIPMENTS_UPDATE,
      parameters: {
        // @ts-expect-error todo
        orderIds: parameters?.orderIds,
        // @ts-expect-error todo
        shipmentIds: parameters?.shipmentIds,
      },
      instance,
    });
  }

  return Promise.resolve(response);
};
