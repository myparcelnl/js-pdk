import {type PdkBuilderContext} from '../../types/command';
import {VerbosityLevel} from '../../constants';

export const isVeryVeryVerbose = (context: PdkBuilderContext) => context.args.verbose >= VerbosityLevel.VeryVeryVerbose;
