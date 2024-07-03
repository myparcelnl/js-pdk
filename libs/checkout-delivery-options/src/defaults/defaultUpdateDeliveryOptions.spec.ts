import {describe, expect, it} from 'vitest';
import {tests, useCheckoutStore, usePdkCheckout} from '@myparcel-pdk/checkout-common';
import {CarrierSetting} from '@myparcel/delivery-options';
import {PackageTypeName} from '@myparcel/constants';
import {useDeliveryOptionsStore} from '../utils';
import {initializeCheckoutDeliveryOptions} from '../initializeCheckoutDeliveryOptions';
import {defaultUpdateDeliveryOptions} from './defaultUpdateDeliveryOptions';

/** @vitest-environment happy-dom */

const doTestSetup = async (originalPackageType?: PackageTypeName): Promise<void> => {
  tests.getMockDeliveryOptionsConfig.mockReturnValueOnce({
    ...tests.getMockDeliveryOptionsConfig(),
    packageType: originalPackageType,
  });

  const mockCheckoutContext = tests.getMockCheckoutContext();

  tests.getMockCheckoutContext.mockReturnValueOnce({
    ...mockCheckoutContext,
    settings: {
      ...mockCheckoutContext?.settings,
      allowedShippingMethods: {
        '-1': ['sm_default'],
        [PackageTypeName.Package]: ['sm_package'],
        [PackageTypeName.PackageSmall]: ['sm_package_small'],
        [PackageTypeName.Mailbox]: ['sm_mailbox'],
        [PackageTypeName.DigitalStamp]: ['sm_digital_stamp'],
        [PackageTypeName.Letter]: ['sm_letter'],
      },
    },
  });

  await tests.mockPdkCheckout();

  usePdkCheckout().onInitialize(() => initializeCheckoutDeliveryOptions());
};

describe('defaultUpdateDeliveryOptions', () => {
  it.each([
    {
      originalPackageType: undefined,
      shippingMethod: 'sm_default',
      expectedPackageType: undefined,
    },
    {
      originalPackageType: PackageTypeName.PackageSmall,
      shippingMethod: 'unsupported',
      expectedPackageType: PackageTypeName.PackageSmall,
    },
    {
      originalPackageType: PackageTypeName.DigitalStamp,
      shippingMethod: 'sm_mailbox',
      expectedPackageType: PackageTypeName.Mailbox,
    },
    {
      originalPackageType: PackageTypeName.Mailbox,
      shippingMethod: 'sm_package',
      expectedPackageType: PackageTypeName.Package,
    },
    {
      originalPackageType: PackageTypeName.Package,
      shippingMethod: 'sm_mailbox',
      expectedPackageType: PackageTypeName.Mailbox,
    },
    {
      originalPackageType: PackageTypeName.Package,
      shippingMethod: 'sm_digital_stamp',
      expectedPackageType: PackageTypeName.DigitalStamp,
    },
    {
      originalPackageType: PackageTypeName.Package,
      shippingMethod: 'sm_package_small',
      expectedPackageType: PackageTypeName.PackageSmall,
    },
  ])(
    'returns $expectedPackageType when original is $originalPackageType and shipping method is $shippingMethod',
    async ({originalPackageType, expectedPackageType, shippingMethod}) => {
      await doTestSetup(originalPackageType);

      const checkout = useCheckoutStore();
      const deliveryOptions = useDeliveryOptionsStore();

      const firstResult = defaultUpdateDeliveryOptions(deliveryOptions.state);
      expect(firstResult[CarrierSetting.PackageType]).toBe(originalPackageType);

      // Change the shipping method
      checkout.set({form: {...checkout.state.form, shippingMethod}});

      const newResult = defaultUpdateDeliveryOptions(deliveryOptions.state);
      expect(newResult[CarrierSetting.PackageType]).toBe(expectedPackageType);

      checkout.set({form: {...checkout.state.form, shippingMethod: 'sm_default'}});

      const finalResult = defaultUpdateDeliveryOptions(deliveryOptions.state);
      expect(finalResult[CarrierSetting.PackageType]).toBe(originalPackageType);
    },
  );
});
