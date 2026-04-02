import {snakeCase} from 'lodash-unified';
import {SHIPMENT_OPTIONS} from '../shipmentOptions';

/**
 * Generates a translation key for a shipment option field label.
 *
 * Accepts `string` because option names come from the carrier context at
 * runtime. Converts to snake_case for the translation lookup.
 */
export const getFieldLabel = (name: string): string =>
  snakeCase(`${SHIPMENT_OPTIONS}_${name}`);
