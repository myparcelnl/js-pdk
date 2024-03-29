import {vi} from 'vitest';
import {type AdminComponentMap, type AdminConfiguration} from '../../types';
import {LogLevel} from '../../services';

export const mockDefaultConfig = vi.fn(
  (): AdminConfiguration => ({
    components: {} as AdminComponentMap,
    logLevel: LogLevel.Off,
    generateFieldId: (element) => `${element.form.name}-${element.name}`,
  }),
);
