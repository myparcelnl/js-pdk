import {usePdkCheckout} from '../utils/usePdkCheckout';
import {type PdkCheckoutConfigInput} from '../types/checkout.types';
import {createPdkCheckout} from '../createPdkCheckout';
import {mockDeliveryOptionsElement} from './mockDeliveryOptionsElement';
import {getMockPdkCheckoutConfig} from './getMockPdkCheckoutConfig';

function reset() {
  // Clear the window object
  // @ts-expect-error this is correct for testing
  window.MyParcelPdk = undefined;

  // Delete any wrappers added by previous tests
  document.getElementById('test-wrapper')?.remove();
}

export const mockPdkCheckout = (config?: Partial<PdkCheckoutConfigInput>, includeElements = true): Promise<void> => {
  reset();

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
