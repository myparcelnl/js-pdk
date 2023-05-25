import {createCheckoutStore} from '@myparcel-pdk/frontend-checkout-core';

export const initializeCheckoutStore = (): void => {
  window.MyParcelPdk.stores.checkout = createCheckoutStore();
};
