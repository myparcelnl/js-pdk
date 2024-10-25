import {vi} from 'vitest';
import {AdminContextKey} from '@myparcel-pdk/common';
import {type AdminAppConfig} from '../../types/admin.types';
import {AdminView} from '../../data/view';
import {mockDefaultLogger} from './mockDefaultLogger';
import {mockDefaultGlobalContext} from './mockDefaultGlobalContext';
import {mockDefaultDynamicContext} from './mockDefaultDynamicContext';
import {mockDefaultConfig} from './mockDefaultConfig';

export const mockDefaultAppConfig = vi.fn((): AdminAppConfig => {
  return {
    appName: 'test',
    config: mockDefaultConfig(),
    context: {
      [AdminContextKey.Dynamic]: mockDefaultDynamicContext(),
      [AdminContextKey.Global]: mockDefaultGlobalContext(),
    },
    logger: mockDefaultLogger(),
    view: AdminView.OrderBox,
  };
});
