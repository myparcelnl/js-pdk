import {type BaseCommandContext} from '../../types/command.types';

export const isDryRun = (context: BaseCommandContext): boolean => Boolean(context.args.dryRun);
