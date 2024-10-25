import {vi} from 'vitest';
import {type AdminConfiguration} from '../../types/configuration.types';
import {type AdminComponentMap} from '../../types/admin.types';
import {LogLevel} from '../../services/logger';

export const mockDefaultConfig = vi.fn(
  (): AdminConfiguration => ({
    components: {} as AdminComponentMap,
    logLevel: LogLevel.Off,
    generateFieldId: (element) => `${element.form.name}-${element.name}`,
  }),
);
