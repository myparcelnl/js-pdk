import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {getDynamicTranslation} from '../../utils';
import {type SelectOption} from '../../types';
import {getCarrierForOrder} from './getCarrierForOrder';

export const getDeliveryTypes = (form: FormInstance): SelectOption[] => {
  const carrier = getCarrierForOrder(form);

  if (!carrier) {
    return [];
  }

  return carrier.deliveryTypes.map((name) => ({
    label: getDynamicTranslation('delivery_type', name),
    value: name,
  }));
};
