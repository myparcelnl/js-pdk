import {vi} from 'vitest';
import {assign} from 'radash';
import {
  CarrierSetting,
  ConfigSetting,
  type InputDeliveryOptionsConfig,
  KEY_CARRIER_SETTINGS,
} from '@myparcel-dev/delivery-options';
import {CarrierName, PackageTypeName, PlatformName} from '@myparcel-dev/constants';

export const getMockDeliveryOptionsConfig = vi.fn(
  (config?: Partial<InputDeliveryOptionsConfig>): InputDeliveryOptionsConfig => {
    return assign(
      {
        [ConfigSetting.Platform]: PlatformName.MyParcel,
        [CarrierSetting.PackageType]: PackageTypeName.Package,
        [KEY_CARRIER_SETTINGS]: {
          [CarrierName.PostNl]: {},
          [`${CarrierName.PostNl}:1`]: {},
          [CarrierName.DhlForYou]: {},
        },
      },
      // @ts-expect-error radash types are not great
      config,
    );
  },
);
