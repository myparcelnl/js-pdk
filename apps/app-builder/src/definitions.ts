import {defineCommand} from './utils/defineCommand';
import {defineBulkCommand} from './utils/defineBulkCommand';
import {type CommandDefinition} from './types/command.types';
import {type BulkCommandDefinition} from './types/bulkCommand.types';
import {
  COMMAND_BUILD_NAME,
  COMMAND_CLEAN_NAME,
  COMMAND_COPY_NAME,
  COMMAND_INCREMENT_NAME,
  COMMAND_INIT_NAME,
  COMMAND_PRERELEASE_NAME,
  COMMAND_RELEASE_NAME,
  COMMAND_RENAME_NAME,
  COMMAND_SCOPE_PHP_NAME,
  COMMAND_TRANSFORM_NAME,
  COMMAND_TRANSLATIONS_NAME,
  COMMAND_UPGRADE_ALL_NAME,
  COMMAND_UPGRADE_JS_NAME,
  COMMAND_UPGRADE_NAME,
  COMMAND_UPGRADE_PHP_NAME,
  COMMAND_UPGRADE_SELF_NAME,
  COMMAND_ZIP_NAME,
  COMMIT_TYPE_AUTO,
  MYPARCEL_PDK_APP_BUILDER,
  MYPARCEL_PDK_NPM_GLOB,
  MYPARCEL_PDK_PACKAGIST_NAME,
} from './constants';
import {type UpgradeCommandArgs} from './commands/upgrade/upgrade.types';

export const initCommand = defineCommand({
  name: COMMAND_INIT_NAME,
  action: () => import('./commands/init'),
  description:
    'Initialize the pdk builder by generating a config file in the current directory. A config file is needed to run all other commands.',
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
  description: 'Copy source files to output directory per platform.',
});

export const incrementCommand = defineCommand({
  name: COMMAND_INCREMENT_NAME,
  action: () => import('./commands/increment'),
  description: 'Increment version in output files.',
});

export const renameCommand = defineCommand({
  name: COMMAND_RENAME_NAME,
  action: () => import('./commands/rename'),
  description: 'Rename output files.',
});

export const scopePhpCommand = defineCommand({
  name: COMMAND_SCOPE_PHP_NAME,
  action: () => import('./commands/scopePhp'),
  description: 'Prefix php files with humbug/php-scoper.',
});

export const transformCommand = defineCommand({
  name: COMMAND_TRANSFORM_NAME,
  action: () => import('./commands/transform'),
  description:
    'Transform output files for the target platform. Replaces "MyParcelNL" with "<platform>" in names and contents of all source files.',
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
    [
      '--commit-type <type>',
      'Commit type. Set to "auto" to infer from the version increase of the upgraded dependency. If set manually, should be a conventional commit type.',
      COMMIT_TYPE_AUTO,
    ],
    ['--no-check', 'Skip checking whether the lockfile is modified.'],
    ['--no-commit', 'Skip creating a commit for the changes.'],
    ['--report', 'Output a JSON report of the changes.'],
    ['--report-file <filename>', 'Filename for the JSON report.', 'upgrade-report.json'],
    ['--report-overwrite', 'Overwrite the report file if it already exists. Default is to append.'],
    [
      '-l, --lockfile <lockfile>',
      'Provide an alternative path to a lockfile. Defaults to the default lockfile for the inferred dependency type.',
    ],
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
] satisfies CommandDefinition[]);

export const buildBulkCommand = defineBulkCommand({
  name: COMMAND_BUILD_NAME,
  commands: [cleanCommand, scopePhpCommand, ...CORE_COMMANDS],
});

export const upgradePhpBulkCommand = defineBulkCommand({
  name: COMMAND_UPGRADE_PHP_NAME,
  description: 'Upgrade php pdk dependencies.',
  commands: [[upgradeCommand, {arguments: [MYPARCEL_PDK_PACKAGIST_NAME]}]],
});

export const upgradeJsBulkCommand = defineBulkCommand({
  name: COMMAND_UPGRADE_JS_NAME,
  description: 'Upgrade js pdk dependencies.',
  commands: [[upgradeCommand, {arguments: [MYPARCEL_PDK_NPM_GLOB]}]],
});

export const upgradeAllBulkCommand = defineBulkCommand({
  name: COMMAND_UPGRADE_ALL_NAME,
  description: 'Upgrade all pdk dependencies.',
  commands: [
    [upgradeCommand, {arguments: [MYPARCEL_PDK_PACKAGIST_NAME]}],
    [upgradeCommand, {arguments: [MYPARCEL_PDK_NPM_GLOB]}],
  ],
});

/**
 * The "upgrade self" command is a special case of the upgrade command that upgrades the app-builder. It's not possible to update the app builder together with the other dependencies because the app builder is used to run the commands.
 */
export const upgradeSelfCommand = defineBulkCommand({
  name: COMMAND_UPGRADE_SELF_NAME,
  description: `Upgrade ${MYPARCEL_PDK_APP_BUILDER} dependency.`,
  commands: [
    [
      upgradeCommand,
      {
        arguments: [MYPARCEL_PDK_APP_BUILDER],
        commitType: 'build',
      },
    ],
  ],
});

export const preReleaseBulkCommand = defineBulkCommand({
  name: COMMAND_PRERELEASE_NAME,
  description: 'Prepare a release.',
  commands: [cleanCommand, scopePhpCommand, incrementCommand, ...CORE_COMMANDS, zipCommand],
});

export const releaseBulkCommand = defineBulkCommand({
  name: COMMAND_RELEASE_NAME,
  commands: [cleanCommand, scopePhpCommand, incrementCommand, ...CORE_COMMANDS, zipCommand],
});

export const ALL_COMMANDS: readonly CommandDefinition[] = Object.freeze([
  initCommand,
  cleanCommand,
  copyCommand,
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
  preReleaseBulkCommand,
  releaseBulkCommand,
  upgradeAllBulkCommand,
  upgradeJsBulkCommand,
  upgradePhpBulkCommand,
  upgradeSelfCommand,
]);
