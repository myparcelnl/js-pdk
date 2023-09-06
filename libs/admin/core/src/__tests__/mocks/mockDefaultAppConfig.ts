import {vi} from 'vitest';
import {mockDefaultDynamicContext} from '@myparcel-pdk/admin-testing';
import {AdminView} from '@myparcel-pdk/admin-common';
import {type AdminAppConfig} from '../../data';
import {mockDefaultLogger} from './mockDefaultLogger';
import {mockDefaultGlobalContext} from './mockDefaultGlobalContext';
import {mockDefaultConfig} from './mockDefaultConfig';

export const mockDefaultAppConfig = vi.fn((): AdminAppConfig => {
  return {
    appName: 'test',
    config: mockDefaultConfig(),
    context: {
      dynamic: mockDefaultDynamicContext(),
      global: mockDefaultGlobalContext(),
    },
    logger: mockDefaultLogger(),
    view: AdminView.OrderBox,
  };
});
