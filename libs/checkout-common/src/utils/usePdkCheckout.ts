// noinspection JSUnusedGlobalSymbols

import {type PdkCheckout} from '../types';

export const usePdkCheckout = (): PdkCheckout => window.MyParcelPdk.instance;
