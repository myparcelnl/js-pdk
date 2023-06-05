import {vi} from 'vitest';
import {type Plugin} from '@myparcel-pdk/common';
import {getDefaultShop} from './getDefaultShop';

export const getDefaultAccount = vi.fn((): Plugin.ModelContextDynamicContext['account'] => ({
  id: 1,
  platformId: 1,
  status: 2,
  contactInfo: {},
  generalSettings: {
    isTest: false,
    hasCarrierContract: false,
    orderMode: false,
  },
  shops: [getDefaultShop()],
}));
