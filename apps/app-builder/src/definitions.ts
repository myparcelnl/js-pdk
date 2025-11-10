import {defineCommand} from './utils/defineCommand';
import {defineBulkCommand} from './utils/defineBulkCommand';
import {type AnyCommandDefinition} from './types/command.types';
import {type BulkCommandDefinition} from './types/bulkCommand.types';
import {
  COMMAND_AUTOLOAD_NAME,
  COMMAND_BUILD_NAME,
  COMMAND_CLEAN_NAME,
  COMMAND_COPY_NAME,
  COMMAND_INCREMENT_NAME,
  COMMAND_INIT_NAME,
  COMMAND_PRERELEASE_NAME,
  COMMAND_RELEASE_NAME,
  COMMAND_SCOPE_PHP_NAME,
  COMMAND_TRANSLATIONS_NAME,
} from './constants';

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
  description: 'Copy source files to output directory.',
});

export const incrementCommand = defineCommand({
  name: COMMAND_INCREMENT_NAME,
  action: () => import('./commands/increment'),
  description: 'Increment version in output files.',
});

export const scopePhpCommand = defineCommand({
  name: COMMAND_SCOPE_PHP_NAME,
  action: () => import('./commands/scopePhp'),
  description: 'Prefix php files with humbug/php-scoper.',
});

export const translationsCommand = defineCommand({
  name: COMMAND_TRANSLATIONS_NAME,
  action: () => import('./commands/translations'),
  description: 'Import translations.',
});

export const dumpAutoloadCommand = defineCommand({
  name: COMMAND_AUTOLOAD_NAME,
  action: () => import('./commands/dumpAutoload'),
  description: 'Run composer autoload command.',
});

const CORE_COMMANDS = Object.freeze([translationsCommand, copyCommand] satisfies AnyCommandDefinition[]);

export const buildBulkCommand = defineBulkCommand({
  name: COMMAND_BUILD_NAME,
  commands: [cleanCommand, scopePhpCommand, ...CORE_COMMANDS],
});

export const preReleaseBulkCommand = defineBulkCommand({
  name: COMMAND_PRERELEASE_NAME,
  description: 'Prepare a release.',
  commands: [cleanCommand, scopePhpCommand, incrementCommand, ...CORE_COMMANDS, dumpAutoloadCommand],
});

export const releaseBulkCommand = defineBulkCommand({
  name: COMMAND_RELEASE_NAME,
  commands: [cleanCommand, scopePhpCommand, incrementCommand, ...CORE_COMMANDS, dumpAutoloadCommand],
});

export const ALL_COMMANDS: readonly AnyCommandDefinition[] = Object.freeze([
  initCommand,
  cleanCommand,
  copyCommand,
  incrementCommand,
  scopePhpCommand,
  translationsCommand,
]);

export const ALL_BULK_COMMANDS: readonly BulkCommandDefinition[] = Object.freeze([
  buildBulkCommand,
  preReleaseBulkCommand,
  releaseBulkCommand,
]);
