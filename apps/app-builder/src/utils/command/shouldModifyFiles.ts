import {type PdkBuilderContext} from '../../types/command';

export const shouldModifyFiles = (context: PdkBuilderContext): boolean => !context.args.dryRun;
