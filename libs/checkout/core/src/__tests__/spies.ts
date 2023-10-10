import {vi} from 'vitest';
import {AddressType} from '@myparcel-pdk/checkout-common';

export const doRequestSpy = vi.fn();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const getFormSpy = vi.fn(() => document.querySelector<HTMLFormElement>('form')!);

export const getFormDataSpy = vi.fn(
  (): Record<string, string> => ({
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
    'shipping-method': 'shipping-method',
  }),
);

export const hasAddressTypeSpy = vi.fn(() => true);

export const initializeSpy = vi.fn(() => Promise.resolve());

export const toggleFieldSpy = vi.fn();
