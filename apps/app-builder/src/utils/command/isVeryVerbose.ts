import {type PdkBuilderContext} from '../../types';
import {VerbosityLevel} from '../../constants';

export const isVeryVerbose = (context: PdkBuilderContext) => context.args.verbose >= VerbosityLevel.VeryVerbose;
