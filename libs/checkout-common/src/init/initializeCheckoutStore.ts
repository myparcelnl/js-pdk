import {createCheckoutStore} from '../store/createCheckoutStore';

export const initializeCheckoutStore = (): void => {
  window.MyParcelPdk.stores.checkout = createCheckoutStore();
};
