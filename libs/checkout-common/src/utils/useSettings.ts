import {type CheckoutSettings} from '../types';

export const useSettings = (): CheckoutSettings => {
  return window.MyParcelPdk.stores.checkout.state.context.settings;
};
