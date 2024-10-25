import {snakeCase} from 'lodash-unified';
import {type Shipment} from '@myparcel-pdk/common';
import {SHIPMENT_OPTIONS} from '../shipmentOptions/field';

export const getFieldLabel = (name: keyof Shipment.ModelShipmentOptions): string =>
  snakeCase(`${SHIPMENT_OPTIONS}_${name}`);
