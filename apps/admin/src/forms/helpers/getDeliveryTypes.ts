import {type CarrierModel} from '@myparcel-dev/pdk-common';
import {getDynamicTranslation} from '../../utils';
import {type SelectOption} from '../../types';

export const getDeliveryTypes = (carrier: CarrierModel | undefined): SelectOption[] => {
  if (!carrier) {
    return [];
  }

  return carrier.deliveryTypes.map((name) => ({
    label: getDynamicTranslation('delivery_type', name),
    value: name,
  }));
};
