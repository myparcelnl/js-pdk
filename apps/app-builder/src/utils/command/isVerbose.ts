import {type BaseCommandContext} from '../../types/command.types';
import {VerbosityLevel} from '../../constants';

export const isVerbose = (context: BaseCommandContext): boolean => context.args.verbose >= VerbosityLevel.Verbose;
