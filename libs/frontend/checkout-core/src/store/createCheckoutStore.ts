import {AddressType, PdkCheckoutForm, PdkField} from '../types';
import {Util, useUtil} from '../utils';

export type CheckoutStoreState = {
  addressType: AddressType;
  form: PdkCheckoutForm;
  hasDeliveryOptions: boolean;
  hiddenInput?: HTMLInputElement;
  shippingMethod?: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createCheckoutStore = () => {
  const createStore = useUtil(Util.CreateStore);

  return createStore<CheckoutStoreState>(Symbol('checkout'), () => {
    return {
      state: {
        addressType: AddressType.Billing,
        form: {
          [AddressType.Billing]: {},
          [AddressType.Shipping]: {},
        } as PdkCheckoutForm,
        hasDeliveryOptions: false,
      },

      listeners: {
        update: [
          (newState, oldState) => {
            const fieldsEqual = useUtil(Util.FieldsEqual);

            if (fieldsEqual(newState.form, oldState.form, PdkField.ToggleAddressType)) {
              return;
            }

            const shipToDifferentAddress = newState.form[PdkField.ToggleAddressType] === '1';

            newState.addressType = shipToDifferentAddress ? AddressType.Billing : AddressType.Shipping;
          },

          (newState, oldState) => {
            const fieldsEqual = useUtil(Util.FieldsEqual);

            if (fieldsEqual(newState.form, oldState.form, PdkField.ShippingMethod)) {
              return;
            }

            newState.shippingMethod = newState.form[PdkField.ShippingMethod];

            return newState;
          },
        ],
      },
    };
  })();
};
