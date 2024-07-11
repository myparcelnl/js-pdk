import {type ShippingMethodId} from '@myparcel-pdk/common';
import {PdkUtil, useSettings, useUtil} from '@myparcel-pdk/checkout-common';
import {PackageTypeName} from '@myparcel/constants';

export const getPackageTypeFromShippingMethod = (shippingMethod: string): PackageTypeName | undefined => {
  const isEnumValue = useUtil(PdkUtil.IsEnumValue);
  const {allowedShippingMethods} = useSettings();

  const found = Object.entries(allowedShippingMethods).find(([, value]) => value.includes(shippingMethod)) as
    | [PackageTypeName, ShippingMethodId[]]
    | undefined;

  const result = found?.[0];

  const isPackageType = isEnumValue(result, PackageTypeName);

  return isPackageType ? result : undefined;
};
