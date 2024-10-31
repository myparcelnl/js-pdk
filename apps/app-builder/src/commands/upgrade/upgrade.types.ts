import {type CommandArgs, type PdkBuilderContext} from '../../types/command.types';
import {type UpgradeMode} from './enums';

export type UpgradeCommandArgs = CommandArgs & {
  check?: boolean;
  commit?: boolean;
  commitType?: string;
  lockfile?: string;
  report?: boolean;
  reportFile: string;
  reportOverwrite?: boolean;
};

export interface PdkBuilderUpgradeContext extends PdkBuilderContext<UpgradeCommandArgs> {
  mode: UpgradeMode;
  packageName: string;
  lockfilePath: string;
}

export interface ParsedEntry {
  name: string;
  repository?: string;
  version: string;
}

export interface UpgradedEntry extends ParsedEntry {
  oldVersion: string | undefined;
  repository?: string | undefined;
}

export interface ParsedVersions {
  oldVersions: ParsedEntry[];
  newVersions: ParsedEntry[];
}
