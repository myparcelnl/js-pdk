import {type PdkCheckoutConfig} from '../types/checkout.types';
import {type AddressType} from '../data/address';

export const defaultGetAddressType = ((value) => value as AddressType) satisfies PdkCheckoutConfig['getAddressType'];
