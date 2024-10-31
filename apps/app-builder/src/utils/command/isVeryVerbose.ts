import {type BaseCommandContext} from '../../types/command.types';
import {VerbosityLevel} from '../../constants';

export const isVeryVerbose = (context: BaseCommandContext): boolean =>
  context.args.verbose >= VerbosityLevel.VeryVerbose;
