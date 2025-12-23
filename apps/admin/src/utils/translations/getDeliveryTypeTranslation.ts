import {type DeliveryTypeName} from '@myparcel-dev/constants';
import {getDynamicTranslation} from './getDynamicTranslation';

export const getDeliveryTypeTranslation = (name?: DeliveryTypeName | string): string =>
  getDynamicTranslation('delivery_type', name);
