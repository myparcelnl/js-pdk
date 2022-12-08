import {FormInstance, useFormBuilder} from '@myparcel/vue-form-builder';
import {useContextStore} from '../stores';

export function getExportContext(): {orderIds: string; form: FormInstance} {
  const store = useContextStore();

  const orderIds = store.context.orderIdentifier;

  if (!orderIds) {
    throw new Error('No order found');
  }

  const formBuilder = useFormBuilder();
  const form = formBuilder.forms[`shipmentOptions${orderIds}`];

  return {orderIds, form};
}
