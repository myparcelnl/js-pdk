import {CommandArgs, PdkBuilderConfig} from '../types';

export const resolveFileName = (
  filename: string,
  context: {config: PdkBuilderConfig; platform?: string; args?: CommandArgs},
): string => {
  const fields: Record<string, string> = {
    name: context.config.name,
    platform: context.platform ?? '',
    version: context.args?.version ?? context.config.version,
  };

  return filename.replace(/\{\{\s*(platform|name|version)\s*}}/g, (match, group) => fields[group] ?? '');
};
