import {ActionParameters, FrontendAction} from '../index';
import {InstanceContextKey, ModalKey} from '../../types';
import {useContextStore} from '../../stores';
import {useFormBuilder} from '@myparcel/vue-form-builder';
import {useModalOrder} from '../../composables';

export const beforeOrderAction = <A extends FrontendAction>(
  action: A,
  parameters: Partial<ActionParameters<A>> = {},
): Promise<ActionParameters<A>> => {
  const orderId = useModalOrder() ?? useContextStore().context[InstanceContextKey.ORDER_IDENTIFIER] ?? null;

  // @ts-expect-error todo
  parameters.orderIds = orderId;

  // @ts-expect-error todo
  parameters.form = useFormBuilder().forms[`${ModalKey.SHIPMENT_OPTIONS}_${orderId}`];

  return Promise.resolve(parameters as ActionParameters<A>);
};
