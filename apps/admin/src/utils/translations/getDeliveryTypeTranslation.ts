import {type DeliveryTypeName} from '@myparcel/constants';
import {getDynamicTranslation} from './getDynamicTranslation';

export const getDeliveryTypeTranslation = (name?: DeliveryTypeName | string): string =>
  getDynamicTranslation('delivery_type', name);
