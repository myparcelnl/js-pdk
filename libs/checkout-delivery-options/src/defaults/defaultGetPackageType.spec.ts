// @vitest-environment happy-dom

import {describe, expect, it} from 'vitest';
import {tests, useCheckoutStore} from '@myparcel-pdk/checkout-common';
import {PackageTypeName} from '@myparcel/constants';
import {defaultGetPackageType} from './defaultGetPackageType';

type TestInput = [string, PackageTypeName | undefined];

describe('defaultGetPackageType', () => {
  it.each([
    ['flat_rate:1', PackageTypeName.Package],
    ['flat_rate:2', PackageTypeName.PackageSmall],
    ['flat_rate:3', PackageTypeName.Mailbox],
    ['flat_rate:4', PackageTypeName.Mailbox],
    ['flat_rate:5', PackageTypeName.DigitalStamp],
    ['flat_rate:6', PackageTypeName.Letter],
    ['standard', undefined],
  ] satisfies TestInput[])('returns the package type for shipping method %s', async (shippingMethod, result) => {
    expect.assertions(2);

    tests.mockShippingMethod(shippingMethod);
    await tests.mockPdkCheckout();

    const packageType = defaultGetPackageType();
    const checkout = useCheckoutStore();

    expect(packageType).toBe(result);
    expect(checkout.state.form.shippingMethod).toBe(shippingMethod);
  });
});
