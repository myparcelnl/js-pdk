import {vi} from 'vitest';
import {createLogger} from '@myparcel-pdk/admin-core';

export const getDefaultLogger = vi.fn(() => createLogger('test'));
