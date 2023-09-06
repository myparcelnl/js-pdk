import {vi} from 'vitest';
import {AdminView} from '@myparcel-pdk/common';
import {type AdminAppConfig} from '@myparcel-pdk/admin-core';
import {getDefaultLogger} from './getDefaultLogger';
import {getDefaultGlobalContext} from './getDefaultGlobalContext';
import {getDefaultDynamicContext} from './getDefaultDynamicContext';
import {getDefaultConfig} from './getDefaultConfig';

export const createDefaultAppConfig = vi.fn((): AdminAppConfig => {
  return {
    appName: 'test',
    config: getDefaultConfig(),
    context: {
      dynamic: getDefaultDynamicContext(),
      global: getDefaultGlobalContext(),
    },
    logger: getDefaultLogger(),
    view: AdminView.OrderBox,
  };
});
