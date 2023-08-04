import {type Debugger} from 'debug';
import {type CommandArgs, type PdkBuilderConfig} from '../types';

export interface BaseVersionSource<P extends string = string> {
  /**
   * Path to the file.
   */
  path: P;
}

export interface JsonVersionSource<P extends string = string> extends BaseVersionSource<P> {
  /**
   * Key that contains the version. Defaults to `version`.
   */
  key?: string;
}

export interface RegexVersionSource<P extends string = string> extends BaseVersionSource<P> {
  /**
   * Regex to match the version number. Leave empty to match the entire file.
   */
  regex: string | RegExp;
}

export type VersionSource = JsonVersionSource | RegexVersionSource;

export type VersionReplacerOutput = {
  existingVersion: string | undefined;
  newContents: string;
};

export interface VersionReplacerInput<T extends VersionSource = VersionSource> {
  match: T;
  contents: string;
  newVersion: string;
}

export interface VersionReplacerContext {
  config: PdkBuilderConfig;
  args: CommandArgs;
  debug: Debugger;
}

export type VersionReplacer<T extends VersionSource = VersionSource> = (
  data: VersionReplacerInput<T>,
  context: VersionReplacerContext,
) => VersionReplacerOutput;
