import {vi} from 'vitest';

export const getDefaultShop = vi.fn(() => ({
  name: 'test',
  id: 1,
  platformId: 1,
  accountId: 1,
  generalSettings: {},
  billing: {},
  return: {},
  carrierConfigurations: [],
  carrierOptions: [],
  deliveryAddress: {},
  hidden: false,
  shipmentOptions: {},
  trackTrace: {},
}));
