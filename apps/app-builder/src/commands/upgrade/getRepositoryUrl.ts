import {VerbosityLevel} from '../../constants';
import {type ParsedEntry, type PdkBuilderUpgradeContext} from './upgrade.types';
import {getNodeRepositoryUrl} from './getNodeRepositoryUrl';
import {UpgradeMode} from './enums';

export const getRepositoryUrl = async (
  entry: ParsedEntry,
  context: PdkBuilderUpgradeContext,
): Promise<undefined | string> => {
  if (entry.repository) {
    return entry.repository;
  }

  if (context.args.verbose >= VerbosityLevel.VeryVerbose) {
    context.debug(`Getting repository URL for ${entry.name}`);
  }

  const {mode} = context;

  switch (mode) {
    case UpgradeMode.Node:
      return getNodeRepositoryUrl(context, entry);
  }

  throw new Error(`Unsupported upgrade mode: ${mode}`);
};
