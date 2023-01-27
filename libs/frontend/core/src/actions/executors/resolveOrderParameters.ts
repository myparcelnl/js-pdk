import {ActionContext, ActionParameters, FrontendAction} from '../index';
import {createShipmentFormName, getOrderId} from '../../utils';
import {useFormBuilder} from '@myparcel/vue-form-builder';

export const resolveOrderParameters = <A extends FrontendAction>({
  parameters,
  instance,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  const formBuilder = useFormBuilder();
  const orderId = getOrderId(instance);

  // @ts-expect-error todo
  parameters.orderIds = orderId;

  // @ts-expect-error todo
  parameters.form = formBuilder.forms.value[createShipmentFormName(orderId)];

  return Promise.resolve(parameters as ActionParameters<A>);
};
