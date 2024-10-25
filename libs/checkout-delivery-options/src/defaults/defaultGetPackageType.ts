import {useCheckoutStore} from '@myparcel-pdk/checkout-common';
import {getPackageTypeFromShippingMethod} from '../utils/getPackageTypeFromShippingMethod';
import {type CheckoutDeliveryOptionsSettings} from '../types/generic.types';

export const defaultGetPackageType = (() => {
  const checkout = useCheckoutStore();
  const {shippingMethod} = checkout.state.form;

  return getPackageTypeFromShippingMethod(shippingMethod);
}) satisfies CheckoutDeliveryOptionsSettings['getPackageType'];
