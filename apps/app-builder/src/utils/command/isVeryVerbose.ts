import {type PdkBuilderContext} from '../../types/command';
import {VerbosityLevel} from '../../constants';

export const isVeryVerbose = (context: PdkBuilderContext) => context.args.verbose >= VerbosityLevel.VeryVerbose;
