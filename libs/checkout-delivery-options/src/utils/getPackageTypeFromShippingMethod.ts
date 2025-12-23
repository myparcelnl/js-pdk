import {type ShippingMethodId} from '@myparcel-dev/pdk-common';
import {PdkUtil, useSettings, useUtil} from '@myparcel-dev/pdk-checkout-common';
import {PackageTypeName} from '@myparcel-dev/constants';

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
