import {CarrierSetting} from '@myparcel-dev/delivery-options';
import {type CheckoutDeliveryOptionsSettings} from '../types';

export const defaultUpdateDeliveryOptions: NonNullable<CheckoutDeliveryOptionsSettings['updateDeliveryOptions']> = ((
  state,
) => {
  const baseConfig = state.configuration.config;

  /**
   * Try to get the package type based on shipping method. If it's not found, use the original package type.
   */
  const packageType = state.settings.getPackageType() ?? state.originalPackageType;

  return {
    ...baseConfig,
    [CarrierSetting.PackageType]: packageType,
  };
}) satisfies CheckoutDeliveryOptionsSettings['updateDeliveryOptions'];
