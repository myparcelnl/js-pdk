import {type FormInstance} from '@myparcel/vue-form-builder';
import {DeliveryTypeName} from '@myparcel/constants';
import {getDynamicTranslation} from '../../utils';
import {type SelectOption} from '../../types';
import {getCarrier} from './getCarrier';

export const getDeliveryTypes = (form?: FormInstance): SelectOption[] => {
  let array = Object.values(DeliveryTypeName);

  if (form) {
    const carrier = getCarrier(form);
    array = array.filter((name) => carrier?.capabilities.deliveryTypes.includes(name));
  }

  return array.map((name) => ({
    label: getDynamicTranslation('delivery_type', name),
    value: name,
  }));
};
