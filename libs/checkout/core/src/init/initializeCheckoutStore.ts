import {createCheckoutStore} from '../store';

export const initializeCheckoutStore = (): void => {
  window.MyParcelPdk.stores.checkout = createCheckoutStore();
};
