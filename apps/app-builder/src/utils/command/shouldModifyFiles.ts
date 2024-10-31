import {type PdkBuilderContext} from '../../types/command.types';
import {isDryRun} from './isDryRun';

export const shouldModifyFiles = (context: PdkBuilderContext): boolean => !isDryRun(context);
