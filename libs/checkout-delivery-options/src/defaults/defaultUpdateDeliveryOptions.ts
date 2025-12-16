import {CarrierSetting} from '@myparcel-dev/delivery-options';
import {useDeliveryOptionsStore} from '../utils';
import {type CheckoutDeliveryOptionsSettings} from '../types';

export const defaultUpdateDeliveryOptions = ((state) => {
  const deliveryOptions = useDeliveryOptionsStore();
  const baseConfig = state.configuration.config;

  /**
   * Try to get the package type based on shipping method. If it's not found, use the original package type.
   */
  const packageType = deliveryOptions.state.settings.getPackageType() ?? deliveryOptions.state.originalPackageType;

  return {
    ...baseConfig,
    [CarrierSetting.PackageType]: packageType,
  };
}) satisfies CheckoutDeliveryOptionsSettings['updateDeliveryOptions'];
