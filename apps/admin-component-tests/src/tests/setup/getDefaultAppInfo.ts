import {vi} from 'vitest';

export const getDefaultAppInfo = vi.fn(() => ({
  name: 'test',
  version: '1.0.0',
  path: '/test',
  title: 'test',
  url: 'http://test.com',
}));
