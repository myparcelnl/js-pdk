import {createCheckoutStore} from '@myparcel-pdk/frontend-checkout-core/src';

export const initializeCheckoutStore = (): void => {
  window.MyParcelPdk.stores.checkout = createCheckoutStore();
};
