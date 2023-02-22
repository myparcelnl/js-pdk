import {PdkBuilderConfig} from '../types';

export const resolveFileName = (filename: string, config: PdkBuilderConfig, platform?: string): string =>
  filename
    .replace(':platform', platform ?? '')
    .replace(':name', config.name)
    .replace(':version', config.version);
