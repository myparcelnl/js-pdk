import {CarrierSetting} from '@myparcel/delivery-options';
import {useDeliveryOptionsStore} from '../utils';
import {type CheckoutDeliveryOptionsSettings} from '../types';

export const defaultUpdateDeliveryOptions = ((state) => {
  const deliveryOptions = useDeliveryOptionsStore();
  const baseConfig = state.configuration.config;

  return {
    ...Object.create(baseConfig),

    /**
     * Try to get the package type based on shipping method. If it's not found, use the passed package type.
     */
    [CarrierSetting.PackageType]:
      deliveryOptions.state.settings.getPackageType() ?? baseConfig[CarrierSetting.PackageType],
  };
}) satisfies CheckoutDeliveryOptionsSettings['updateDeliveryOptions'];
