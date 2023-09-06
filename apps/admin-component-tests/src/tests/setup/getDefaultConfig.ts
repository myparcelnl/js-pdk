import {vi} from 'vitest';
import {type AdminComponentMap} from '@myparcel-pdk/common';
import {type AdminConfiguration, LogLevel} from '@myparcel-pdk/admin-core';

export const getDefaultConfig = vi.fn(
  (): AdminConfiguration => ({
    components: {} as AdminComponentMap,
    logLevel: LogLevel.Off,
    generateFieldId: (element) => `${element.form.name}-${element.name}`,
  }),
);
