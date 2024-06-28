import {type ShippingMethodId} from '@myparcel-pdk/common';
import {PdkUtil, useCheckoutStore, useSettings, useUtil} from '@myparcel-pdk/checkout-common';
import {PackageTypeName} from '@myparcel/constants';
import {type CheckoutDeliveryOptionsSettings} from '../types';

export const defaultGetPackageType = (() => {
  const isEnumValue = useUtil(PdkUtil.IsEnumValue);
  const {allowedShippingMethods} = useSettings();
  const checkout = useCheckoutStore();

  const {shippingMethod} = checkout.state.form;

  const found = Object.entries(allowedShippingMethods).find(([, value]) => value.includes(shippingMethod)) as
    | [PackageTypeName, ShippingMethodId[]]
    | undefined;

  const result = found?.[0];

  const isPackageType = isEnumValue(result, PackageTypeName);

  return isPackageType ? result : undefined;
}) satisfies CheckoutDeliveryOptionsSettings['getPackageType'];
