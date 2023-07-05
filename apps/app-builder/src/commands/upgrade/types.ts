import {type LiftoffEnv} from 'liftoff';
import {type Debugger} from 'debug';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type CommandArgs} from '../../types';

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
  version: string;
}

export interface UpgradedEntry extends ParsedEntry {
  oldVersion: string | undefined;
  repository: string;
}

export type UpgradeCommandArgs = CommandArgs & {
  lockfile?: string;
  check?: boolean;
  commit?: boolean;
};

export interface UpgradeSubContext {
  args: UpgradeCommandArgs;
  debug: Debugger;
  env: LiftoffEnv;
  mode: UpgradeMode;
  packageName: string;
}

export interface UpgradeSubContextWithLockfile extends UpgradeSubContext {
  lockfilePath: string;
}

export interface UpgradeSubResult {
  lockfilePath: string;
  oldVersions: ParsedEntry[];
  newVersions: ParsedEntry[];
}

export type UpgradeSubMethod = (context: UpgradeSubContextWithLockfile) => PromiseOr<UpgradeSubResult>;

export enum UpgradeMode {
  Yarn = 'yarn',
  Composer = 'composer',
}
