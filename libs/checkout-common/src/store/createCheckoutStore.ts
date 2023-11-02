import {getFrontendContext, hasAddressType, useUtil} from '../utils';
import {type CheckoutStoreState, type PdkCheckoutForm} from '../types';
import {updateAddressType} from '../listeners';
import {AddressType, PdkUtil, StoreListener} from '../data';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createCheckoutStore = () => {
  const createStore = useUtil(PdkUtil.CreateStore);

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
