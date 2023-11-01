import {vi} from 'vitest';
import {type Account} from '@myparcel-pdk/common';

export const mockDefaultShop = vi.fn((): Account.ModelShop => {
  return {
    name: 'test',
    id: 1,
    platformId: 1,
    accountId: 1,
    generalSettings: {},
    billing: {},
    return: {},
    carrierConfigurations: [],
    carriers: [],
    deliveryAddress: {},
    hidden: false,
    shipmentOptions: {},
    trackTrace: {},
  };
});
