import {usesPhpScoper} from '../../utils/usesPhpScoper';
import {globFiles} from '../../utils/globFiles';
import {type PdkBuilderContext} from '../../types/command.types';
import {type FileToIncrement, type IncrementCommandArgs} from './increment.types';

export const findFilesToIncrement = async (
  context: PdkBuilderContext<IncrementCommandArgs>,
): Promise<FileToIncrement[]> => {
  const {config} = context;
  const hasPhpScoper = await usesPhpScoper(context);

  return config.versionSource.map((source) => {
    const sources = [source.path];

    if (hasPhpScoper) {
      sources.push(`${config.phpScoper.outDir}/${source.path}`);
      sources.push(`${config.phpScoper.vendorOutDir}/${source.path}`);
    }

    return {
      source,
      files: globFiles(sources, context),
    };
  });
};
