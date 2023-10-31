import {type PdkBuilderContext} from '../types';
import {executeCommand} from './executeCommand';

export const composerInstall = (context: PdkBuilderContext, args: string[] = []) => {
  return executeCommand(context, 'composer', ['install', '--no-interaction', '--no-progress', ...args]);
};
