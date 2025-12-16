import {vi} from 'vitest';
import {type Account} from '@myparcel-dev/pdk-common';
import {mockDefaultShop} from './mockDefaultShop';

export const mockDefaultAccount = vi.fn((): Account.ModelAccount => {
  return {
    id: 1,
    platformId: 1,
    status: 2,
    contactInfo: {},
    generalSettings: {
      isTest: false,
      hasCarrierContract: false,
      orderMode: false,
    },
    shops: [mockDefaultShop()],
  };
});
