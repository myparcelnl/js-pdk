import {ActionParameters, AdminAction} from '../../types';
import {createShipmentFormName, getOrderId} from '../../utils';
import {ActionContext} from './types';
import {useFormBuilder} from '@myparcel/vue-form-builder/src';

export const resolveOrderParameters = <A extends AdminAction>({
  parameters,
  instance,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  const formBuilder = useFormBuilder();
  const orderId = getOrderId(instance);

  // @ts-expect-error todo
  parameters.orderIds = orderId;

  // @ts-expect-error todo
  parameters.form = formBuilder.forms.value[createShipmentFormName(orderId)];

  instance.logger.debug('Resolved parameters', parameters);

  return Promise.resolve(parameters as ActionParameters<A>);
};
