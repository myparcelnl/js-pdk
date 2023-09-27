import {type LiftoffEnv} from 'liftoff';
import {type MakeOptional, type PromiseOr} from '@myparcel/ts-utils';
import {type CommandArgs, type PdkDebugger, type ResolvedPdkBuilderConfig} from '../../types';

export interface ParsedEntry {
  name: string;
  repository?: string;
  version: string;
}

export interface UpgradedEntry extends ParsedEntry {
  oldVersion: string | undefined;
  repository: string | undefined;
}

export type UpgradeCommandArgs = CommandArgs & {
  check?: boolean;
  commit?: boolean;
  commitType?: string;
  lockfile?: string;
};

export type InputUpgradeCommandArgs = MakeOptional<UpgradeCommandArgs, 'composerCommand' | 'yarnCommand'>;

export interface UpgradeSubContext {
  args: UpgradeCommandArgs;
  config: ResolvedPdkBuilderConfig;
  debug: PdkDebugger;
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

export enum NodePackageManager {
  Bun = 'bun',
  Yarn = 'yarn',
}

export enum UpgradeMode {
  Node = 'node',
  Composer = 'composer',
}
