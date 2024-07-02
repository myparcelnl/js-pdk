import {type PdkFormData} from '../types';
import {AddressType} from '../data';

export const DEFAULT_MOCK_FORM_DATA = Object.freeze({
  'address-type': AddressType.Billing,
  'b-address1': 'Straatnaam 12e',
  'b-address2': '',
  'b-city': 'Amsterdam',
  'b-country': 'NL',
  'b-postal-code': '1234AB',
  's-address1': 'Straatnaam 12e',
  's-address2': '',
  's-city': 'Amsterdam',
  's-country': 'NL',
  's-postal-code': '1234AB',
  'shipping-method': 'standard',
} satisfies PdkFormData);
