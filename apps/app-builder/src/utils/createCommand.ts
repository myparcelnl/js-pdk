import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {type PdkBuilderConfig} from '../types';

export const createCommand = (config: PdkBuilderConfig, command: OneOrMore<string>): string => {
  const resolvedRootCommand = toArray(config.rootCommand ?? []);
  const resolvedCommand = toArray(command ?? []);

  return [...resolvedRootCommand, ...resolvedCommand].filter(Boolean).join(' ');
};
