import {type PdkBuilderContext} from '../../types';
import {VerbosityLevel} from '../../constants';

export const isVerbose = (context: PdkBuilderContext) => context.args.verbose >= VerbosityLevel.Verbose;
