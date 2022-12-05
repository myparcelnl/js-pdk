import {FormInstance, useFormBuilder} from '@myparcel/vue-form-builder';
import {useContextStore} from '../../stores';

export function getExportContext(): {orderId: string; form: FormInstance} {
  const store = useContextStore();

  const orderId = store.context.orderIdentifier;

  if (!orderId) {
    throw new Error('No order found');
  }

  const formBuilder = useFormBuilder();
  const form = formBuilder.forms[`shipmentOptions${orderId}`];
  return {orderId, form};
}
