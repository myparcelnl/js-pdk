import {vi} from 'vitest';
import {type AdminConfiguration, LogLevel} from '@myparcel-pdk/frontend-admin-core';
import {type AdminComponentMap} from '@myparcel-pdk/common';

export const getDefaultConfig = vi.fn(
  (): AdminConfiguration => ({
    components: {} as AdminComponentMap,
    logLevel: LogLevel.Off,
    generateFieldId: (element) => `${element.form.name}-${element.name}`,
  }),
);
