import {type PdkCheckoutConfig} from '../types';
import {type AddressType} from '../data';

export const defaultGetAddressType = ((value) => value as AddressType) satisfies PdkCheckoutConfig['getAddressType'];
