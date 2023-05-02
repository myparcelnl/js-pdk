import {CommandArgs, PdkBuilderConfig} from '../types';
import {Debugger} from 'debug';

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

export type VersionReplacer<T extends VersionSource = VersionSource> = (
  data: {
    match: T;
    contents: string;
    newVersion: string;
  },
  context: {
    config: PdkBuilderConfig;
    args: CommandArgs;
    debug: Debugger;
  },
) => VersionReplacerOutput;
