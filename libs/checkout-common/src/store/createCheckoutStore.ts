import {useUtil} from '../utils/useUtil';
import {hasAddressType} from '../utils/hasAddressType';
import {getFrontendContext} from '../utils/getFrontendContext';
import {type CheckoutStoreState} from '../types/store.types';
import {type PdkCheckoutForm} from '../types/checkout.types';
import {updateAddressType} from '../listeners/updateAddressType';
import {PdkUtil} from '../data/utils';
import {StoreListener} from '../data/store';
import {AddressType} from '../data/address';

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
