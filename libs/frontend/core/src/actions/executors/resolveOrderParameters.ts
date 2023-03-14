import {ActionParameters, OrderAction} from '../../types';
import {createShipmentFormName, getOrderId} from '../../utils';
import {ActionContext} from './types';
import {useFormBuilder} from '@myparcel/vue-form-builder/src';

export const resolveOrderParameters = <A extends OrderAction>({
  parameters,
  instance,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  const formBuilder = useFormBuilder();

  // @ts-expect-error todo
  parameters.orderIds = parameters.orderIds ?? getOrderId(instance);

  // @ts-expect-error todo
  parameters.form = parameters.form ?? formBuilder.forms.value[createShipmentFormName(parameters.orderIds)];

  return Promise.resolve(parameters as ActionParameters<A>);
};
