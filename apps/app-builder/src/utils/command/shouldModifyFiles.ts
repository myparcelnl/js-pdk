import {type PdkBuilderContext} from '../../types';

export const shouldModifyFiles = (context: PdkBuilderContext): boolean => !context.args.dryRun;
