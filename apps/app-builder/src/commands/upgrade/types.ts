import {type LiftoffEnv} from 'liftoff';
import {type Debugger} from 'debug';
import {type MakeOptional, type PromiseOr} from '@myparcel/ts-utils';
import {type CommandArgs, type ResolvedPdkBuilderConfig} from '../../types';

export type YarnLockfileEntry = [
  string,
  {
    version: string;
    resolution: string;
    checksum: string;
    languageName: string;
    linkType: string;
  },
];

export interface ParsedEntry {
  name: string;
  repository?: string;
  version: string;
}

export interface UpgradedEntry extends ParsedEntry {
  oldVersion: string | undefined;
  repository: string;
}

export type UpgradeCommandArgs = CommandArgs & {
  check?: boolean;
  commit?: boolean;
  lockfile?: string;
};

export type InputUpgradeCommandArgs = MakeOptional<UpgradeCommandArgs, 'composerCommand' | 'yarnCommand'>;

export interface UpgradeSubContext {
  args: UpgradeCommandArgs;
  config: ResolvedPdkBuilderConfig;
  debug: Debugger;
  env: LiftoffEnv;
  mode: UpgradeMode;
  packageName: string;
}

export interface UpgradeSubContextWithLockfile extends UpgradeSubContext {
  lockfilePath: string;
}

export interface UpgradeSubResult {
  oldVersions: ParsedEntry[];
  newVersions: ParsedEntry[];
}

export type UpgradeSubMethod = (context: UpgradeSubContextWithLockfile) => PromiseOr<UpgradeSubResult>;

export enum UpgradeMode {
  Yarn = 'yarn',
  Composer = 'composer',
}
