import {vi} from 'vitest';
import {type Plugin} from '@myparcel-pdk/admin-common';

export const mockDefaultAppInfo = vi.fn((): Plugin.ModelContextGlobalContext['appInfo'] => {
  return {
    name: 'test',
    version: '1.0.0',
    path: '/test',
    title: 'test',
    url: 'http://test.com',
  };
});
