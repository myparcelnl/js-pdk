import {type CommandArgs, type PdkBuilderConfig, type PdkPlatformName, type StringGenerator} from '../types';
import {resolveString} from './resolveString';

export const resolveFileName = (
  stringGenerator: StringGenerator,
  context: {
    config: PdkBuilderConfig;
    platform?: PdkPlatformName;
    args?: CommandArgs;
  },
): string => {
  const fields: Record<string, string> = {
    name: resolveString(context.config.name, context.platform),
    platform: context.platform ?? '',
    version: context.args?.version ?? context.config.version ?? '',
  };

  const filename = resolveString(stringGenerator, context.platform);

  return filename.replace(/\{\{\s*(platform|name|version)\s*}}/g, (match, group) => fields[group] ?? '');
};
