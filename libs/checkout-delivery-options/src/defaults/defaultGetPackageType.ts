import {useCheckoutStore} from '@myparcel-dev/pdk-checkout-common';
import {getPackageTypeFromShippingMethod} from '../utils';
import {type CheckoutDeliveryOptionsSettings} from '../types';

export const defaultGetPackageType = (() => {
  const checkout = useCheckoutStore();
  const {shippingMethod} = checkout.state.form;

  return getPackageTypeFromShippingMethod(shippingMethod);
}) satisfies CheckoutDeliveryOptionsSettings['getPackageType'];
