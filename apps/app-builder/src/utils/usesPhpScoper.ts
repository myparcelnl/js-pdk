import {type PdkBuilderContext} from '../types';
import {resolveString} from './resolveString';
import {resolvePath} from './resolvePath';
import {exists} from './exists';

export const usesPhpScoper = async (context: PdkBuilderContext): Promise<boolean> => {
  const {config} = context;
  const {enabled} = config.phpScoper;

  const configFile = resolveString(config.phpScoper.configFile, context);
  const hasConfig = await exists(resolvePath(configFile, context));

  if (!hasConfig) {
    if (enabled === true) {
      throw new Error(`File ${configFile} not found in root of project`);
    }

    return false;
  }

  return enabled !== false;
};
