import {get} from '@vueuse/core';
import {useFormBuilder} from '@myparcel/vue-form-builder';
import {getOrderId} from '../../utils/getOrderId';
import {createShipmentFormName} from '../../utils/forms/createShipmentFormName';
import {type ActionParameters} from '../../types/actions/parameters.types';
import {type OrderAction} from '../../types/actions/actions.types';
import {type ActionContext} from './types';

export const resolveOrderParameters = <A extends OrderAction>({
  parameters,
  instance,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  const formBuilder = useFormBuilder();

  parameters.orderIds ??= getOrderId(instance);

  // @ts-expect-error todo
  parameters.form ??= get(formBuilder.forms)?.[createShipmentFormName(parameters.orderIds)];

  return Promise.resolve(parameters as ActionParameters<A>);
};
