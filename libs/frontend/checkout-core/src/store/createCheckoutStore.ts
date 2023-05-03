import {AddressType, CheckoutAppContext, PdkCheckoutForm} from '../types';
import {Util, getAddressType, getFrontendContext, hasAddressType, useUtil} from '../utils';
import {updateAddressType, updateShippingMethod} from '../listeners';
import {StoreListener} from '@myparcel-pdk/frontend-checkout-core/src';

export type CheckoutStoreState = {
  addressType: AddressType;
  addressTypes: AddressType[];
  context: CheckoutAppContext['checkout'];
  form: PdkCheckoutForm;
  hasDeliveryOptions: boolean;
  shippingMethod?: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createCheckoutStore = () => {
  const createStore = useUtil(Util.CreateStore);

  return createStore<CheckoutStoreState>(Symbol('checkout'), () => {
    return {
      state: {
        addressType: getAddressType(),
        addressTypes: ([AddressType.Billing, AddressType.Shipping] as const).filter(hasAddressType),
        context: getFrontendContext(),
        form: {
          [AddressType.Billing]: {},
          [AddressType.Shipping]: {},
        } as PdkCheckoutForm,
        hasDeliveryOptions: false,
      },

      listeners: {
        [StoreListener.Update]: [updateAddressType, updateShippingMethod],
      },
    };
  })();
};
