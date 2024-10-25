import {type PdkCheckout} from '../types/checkout.types';

export const usePdkCheckout = (): PdkCheckout => window.MyParcelPdk.instance;
