import {StoreListener} from '@myparcel-pdk/frontend-checkout-core';
import {Util, getFrontendContext, hasAddressType, useUtil} from '../utils';
import {AddressType, CheckoutAppContext, PdkCheckoutForm} from '../types';
import {updateAddressType} from '../listeners';

export type CheckoutStoreState = {
  addressType: AddressType;
  addressTypes: AddressType[];
  context: CheckoutAppContext['checkout'];
  form: PdkCheckoutForm;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createCheckoutStore = () => {
  const createStore = useUtil(Util.CreateStore);

  return createStore<CheckoutStoreState>(Symbol('checkout'), () => {
    return {
      state: {
        addressType: AddressType.Shipping,
        addressTypes: ([AddressType.Billing, AddressType.Shipping] as const).filter(hasAddressType),
        context: getFrontendContext(),
        form: {
          [AddressType.Billing]: {},
          [AddressType.Shipping]: {},
        } as PdkCheckoutForm,
      },

      listeners: {
        [StoreListener.Update]: [updateAddressType],
      },
    };
  })();
};
