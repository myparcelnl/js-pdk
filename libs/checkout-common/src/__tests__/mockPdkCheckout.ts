import {usePdkCheckout} from '../utils';
import {type PdkCheckoutConfigInput} from '../types';
import {createPdkCheckout} from '../createPdkCheckout';
import {mockDeliveryOptionsElement} from './mockDeliveryOptionsElement';
import {getMockPdkCheckoutConfig} from './getMockPdkCheckoutConfig';

export const mockPdkCheckout = (config?: Partial<PdkCheckoutConfigInput>, includeElements = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (includeElements) {
      mockDeliveryOptionsElement();
    }

    createPdkCheckout(getMockPdkCheckoutConfig(config));

    usePdkCheckout().onInitialize(() => resolve());

    setTimeout(() => {
      reject(new Error('Timeout: mockPdkCheckout'));
    }, 1000);
  });
};
