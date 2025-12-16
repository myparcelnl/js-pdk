import {snakeCase} from 'lodash-unified';
import {type Shipment} from '@myparcel-dev/pdk-common';
import {SHIPMENT_OPTIONS} from '../shipmentOptions';

export const getFieldLabel = (name: keyof Shipment.ModelShipmentOptions): string =>
  snakeCase(`${SHIPMENT_OPTIONS}_${name}`);
