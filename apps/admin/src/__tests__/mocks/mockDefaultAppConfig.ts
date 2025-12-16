import {vi} from 'vitest';
import {AdminContextKey} from '@myparcel-dev/pdk-common';
import {type AdminAppConfig} from '../../types';
import {AdminView} from '../../data';
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
