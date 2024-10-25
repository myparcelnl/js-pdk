import {beforeEach, describe, expect, it} from 'vitest';
import {AddressField, AddressType, PdkField} from '../../data/address';
import {mockPdkCheckout} from '../../__tests__/mockPdkCheckout';
import {getMockFormData} from '../../__tests__/getMockFormData';
import {fieldsEqual} from './fieldsEqual';

describe('fieldsEqual', () => {
  beforeEach(async () => {
    await mockPdkCheckout();
  });

  it('should return true if the fields are equal', () => {
    const result = fieldsEqual(
      getMockFormData({[AddressType.Billing]: {[AddressField.Address1]: 'appelboom'}}),
      getMockFormData({[AddressType.Billing]: {[AddressField.Address1]: 'appelboom'}}),
      AddressField.Address1,
    );

    expect(result).toBe(true);
  });

  it('should return false if the fields are not equal', () => {
    const result = fieldsEqual(
      getMockFormData({[AddressType.Billing]: {[AddressField.Address1]: 'appelboom'}}),
      getMockFormData({[AddressType.Billing]: {[AddressField.Address1]: 'perenboom'}}),
      AddressField.Address1,
    );

    expect(result).toBe(false);
  });

  it('should return true if the fields are equal for a specific address type', () => {
    const result = fieldsEqual(
      getMockFormData({
        [AddressType.Billing]: {
          [AddressField.Address1]: 'ruurd',
        },
        [AddressType.Shipping]: {
          [AddressField.Address1]: 'appelboom',
        },
      }),
      getMockFormData({
        [AddressType.Billing]: {
          [AddressField.Address1]: 'jan-piet',
        },
        [AddressType.Shipping]: {
          [AddressField.Address1]: 'appelboom',
        },
      }),
      AddressField.Address1,
      AddressType.Shipping,
    );

    expect(result).toBe(true);
  });

  it('can check if pdk fields match', () => {
    const result = fieldsEqual(
      getMockFormData({
        [PdkField.ShippingMethod]: 'ruurd',
      }),
      getMockFormData({
        [PdkField.ShippingMethod]: 'ruurd',
      }),
      PdkField.ShippingMethod,
    );

    expect(result).toBe(true);
  });

  it('can check if pdk fields do not match', () => {
    const result = fieldsEqual(
      getMockFormData({
        [PdkField.ShippingMethod]: 'ruurd',
      }),
      getMockFormData({
        [PdkField.ShippingMethod]: 'barend',
      }),
      PdkField.ShippingMethod,
    );

    expect(result).toBe(false);
  });
});
