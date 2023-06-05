import {vi} from 'vitest';
import {LogLevel, type AdminConfiguration} from '@myparcel-pdk/frontend-admin-core';
import {type AdminComponentMap} from '@myparcel-pdk/common';

export const getDefaultConfig = vi.fn(
  (): AdminConfiguration => ({
    components: {} as AdminComponentMap,
    logLevel: LogLevel.Off,
  }),
);
