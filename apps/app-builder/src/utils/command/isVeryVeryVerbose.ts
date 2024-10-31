import {type BaseCommandContext} from '../../types/command.types';
import {VerbosityLevel} from '../../constants';

export const isVeryVeryVerbose = (context: BaseCommandContext): boolean =>
  context.args.verbose >= VerbosityLevel.VeryVeryVerbose;
