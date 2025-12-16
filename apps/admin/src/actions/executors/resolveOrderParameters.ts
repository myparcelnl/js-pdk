import {toValue} from 'vue';
import {useFormBuilder} from '@myparcel-dev/vue-form-builder';
import {createShipmentFormName, getOrderId} from '../../utils';
import {type ActionParameters, type OrderAction} from '../../types';
import {type ActionContext} from './types';

export const resolveOrderParameters = <A extends OrderAction>({
  parameters,
  instance,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  const formBuilder = useFormBuilder();

  parameters.orderIds ??= getOrderId(instance);

  // @ts-expect-error todo
  parameters.form ??= toValue(formBuilder.forms)?.[createShipmentFormName(parameters.orderIds)];

  return Promise.resolve(parameters as ActionParameters<A>);
};
