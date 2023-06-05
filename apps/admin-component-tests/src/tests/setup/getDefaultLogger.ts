import {vi} from 'vitest';
import {createLogger} from '@myparcel-pdk/frontend-admin-core';

export const getDefaultLogger = vi.fn(() => createLogger('test'));
