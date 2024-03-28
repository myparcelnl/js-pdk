import {defineCommand} from './utils/defineCommand';
import {type BulkCommandDefinition, defineBulkCommand} from './utils/defineBulkCommand';
import {type CommandDefinition} from './types';
import {
  COMMAND_BUILD_NAME,
  COMMAND_CLEAN_NAME,
  COMMAND_COPY_NAME,
  COMMAND_DUMP_AUTOLOAD_NAME,
  COMMAND_INCREMENT_NAME,
  COMMAND_INIT_NAME,
  COMMAND_PRERELEASE_NAME,
  COMMAND_RELEASE_NAME,
  COMMAND_RENAME_NAME,
  COMMAND_SCOPE_PHP_NAME,
  COMMAND_TRANSFORM_NAME,
  COMMAND_TRANSLATIONS_NAME,
  COMMAND_UPGRADE_ALL_NAME,
  COMMAND_UPGRADE_NAME,
  COMMAND_ZIP_NAME,
  COMMIT_TYPE_AUTO,
  MYPARCEL_PDK_NPM_GLOB,
  MYPARCEL_PDK_PACKAGIST_NAME,
} from './constants';
import {type UpgradeCommandArgs} from './commands/upgrade/types';

export const initCommand = defineCommand({
  name: COMMAND_INIT_NAME,
  action: () => import('./commands/init'),
  description: 'Generate a config file in the current directory. Necessary for all other commands.',
  hasConfig: false,
});

export const cleanCommand = defineCommand({
  name: COMMAND_CLEAN_NAME,
  action: () => import('./commands/clean'),
  description: 'Clear output directory.',
});

export const copyCommand = defineCommand({
  name: COMMAND_COPY_NAME,
  action: () => import('./commands/copy'),
  description: 'Copy source files to output directory.',
});

export const dumpAutoloadCommand = defineCommand({
  name: COMMAND_DUMP_AUTOLOAD_NAME,
  action: () => import('./commands/dumpAutoload'),
  description: 'Dump autoload.',
});

export const incrementCommand = defineCommand({
  name: COMMAND_INCREMENT_NAME,
  action: () => import('./commands/increment'),
  description: 'Increment version in output files.',
});

export const renameCommand = defineCommand({
  name: COMMAND_RENAME_NAME,
  action: () => import('./commands/rename'),
  description: 'Transform output files.',
});

export const scopePhpCommand = defineCommand({
  name: COMMAND_SCOPE_PHP_NAME,
  action: () => import('./commands/scopePhp'),
  description: 'Prefix php files with humbug/php-scoper.',
});

export const transformCommand = defineCommand({
  name: COMMAND_TRANSFORM_NAME,
  action: () => import('./commands/transform'),
  description: 'Transform output files.',
});

export const translationsCommand = defineCommand({
  name: COMMAND_TRANSLATIONS_NAME,
  action: () => import('./commands/translations'),
  description: 'Import translations.',
});

export const upgradeCommand = defineCommand<UpgradeCommandArgs>({
  name: COMMAND_UPGRADE_NAME,
  action: () => import('./commands/upgrade'),
  description: 'Upgrade a dependency.',
  options: [
    ['-l, --lockfile <lockfile>', 'Provide an alternative path to a lockfile.'],
    ['--commit-type <type>', 'Commit type', COMMIT_TYPE_AUTO],
    ['--no-check', 'Skip checking whether the lockfile is modified.'],
    ['--no-commit', 'Skip creating a commit.'],
  ],
  args: [['[package]', 'Package to upgrade']],
});

export const zipCommand = defineCommand({
  name: COMMAND_ZIP_NAME,
  action: () => import('./commands/zip'),
  description: 'Compress output files into an archive.',
});

const CORE_COMMANDS = Object.freeze([
  translationsCommand,
  copyCommand,
  renameCommand,
  transformCommand,
  dumpAutoloadCommand,
] satisfies CommandDefinition[]);

export const buildBulkCommand = defineBulkCommand({
  name: COMMAND_BUILD_NAME,
  commands: [cleanCommand, scopePhpCommand, ...CORE_COMMANDS],
});

export const upgradeAllBulkCommand = defineBulkCommand({
  name: COMMAND_UPGRADE_ALL_NAME,
  description: 'Upgrade all pdk dependencies.',
  commands: [
    [upgradeCommand, {arguments: [MYPARCEL_PDK_PACKAGIST_NAME]}],
    [upgradeCommand, {arguments: [MYPARCEL_PDK_NPM_GLOB]}],
  ],
});

export const preReleaseBulkCommand = defineBulkCommand({
  name: COMMAND_PRERELEASE_NAME,
  description: 'Prepare a release.',
  commands: [
    cleanCommand,
    [upgradeCommand, {arguments: [MYPARCEL_PDK_PACKAGIST_NAME], commit: false}],
    [upgradeCommand, {arguments: [MYPARCEL_PDK_NPM_GLOB], commit: false}],
    scopePhpCommand,
    incrementCommand,
    ...CORE_COMMANDS,
    zipCommand,
  ],
});

export const releaseBulkCommand = defineBulkCommand({
  name: COMMAND_RELEASE_NAME,
  commands: [cleanCommand, scopePhpCommand, incrementCommand, ...CORE_COMMANDS, zipCommand],
});

export const ALL_COMMANDS: readonly CommandDefinition[] = Object.freeze([
  initCommand,
  cleanCommand,
  copyCommand,
  dumpAutoloadCommand,
  incrementCommand,
  renameCommand,
  scopePhpCommand,
  transformCommand,
  translationsCommand,
  upgradeCommand,
  zipCommand,
]);

export const ALL_BULK_COMMANDS: readonly BulkCommandDefinition[] = Object.freeze([
  buildBulkCommand,
  upgradeAllBulkCommand,
  preReleaseBulkCommand,
  releaseBulkCommand,
]);
