import {get} from '@vueuse/core';
import {useFormBuilder} from '@myparcel/vue-form-builder';
import {createShipmentFormName, getOrderId} from '../../utils';
import {type ActionParameters, type OrderAction} from '../../types';
import {type ActionContext} from './types';

export const resolveOrderParameters = <A extends OrderAction>({
  parameters,
  instance,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  const formBuilder = useFormBuilder();

  // @ts-expect-error todo
  parameters.orderIds ??= getOrderId(instance);

  // @ts-expect-error todo
  parameters.form ??= get(formBuilder.forms)?.[createShipmentFormName(parameters.orderIds)];

  return Promise.resolve(parameters as ActionParameters<A>);
};
