import {PdkBuilderConfig} from '../types';

export const resolveFileName = (filename: string, config: PdkBuilderConfig, platform?: string): string => {
  const fields: Record<string, string> = {
    platform: platform ?? '',
    name: config.name,
    version: config.version,
  };

  return filename.replace(/\{\{\s*(platform|name|version)\s*}}/g, (match, group) => fields[group] ?? '');
};
