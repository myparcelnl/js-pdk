export const TITLE = 'pdk-builder';

export const COMMAND_BUILD_NAME = 'build';

export const COMMAND_CLEAN_NAME = 'clean';

export const COMMAND_COPY_NAME = 'copy';

export const COMMAND_INCREMENT_NAME = 'increment';

export const COMMAND_INIT_NAME = 'init';

export const COMMAND_PRERELEASE_NAME = 'prerelease';

export const COMMAND_RELEASE_NAME = 'release';

export const COMMAND_RENAME_NAME = 'rename';

export const COMMAND_SCOPE_PHP_NAME = 'scope-php';

export const COMMAND_TRANSFORM_NAME = 'transform';

export const COMMAND_TRANSLATIONS_NAME = 'translations';

export const COMMAND_UPGRADE_NAME = 'upgrade';

export const COMMAND_UPGRADE_PHP_NAME = 'upgrade-php';

export const COMMAND_UPGRADE_JS_NAME = 'upgrade-js';

export const COMMAND_UPGRADE_ALL_NAME = 'upgrade-all';

export const COMMAND_UPGRADE_SELF_NAME = 'upgrade-self';

export const COMMAND_ZIP_NAME = 'zip';

export const COMMAND_AUTOLOAD_NAME = 'dump-autoload';

export type CommandName =
  | typeof COMMAND_CLEAN_NAME
  | typeof COMMAND_COPY_NAME
  | typeof COMMAND_INCREMENT_NAME
  | typeof COMMAND_INIT_NAME
  | typeof COMMAND_RENAME_NAME
  | typeof COMMAND_SCOPE_PHP_NAME
  | typeof COMMAND_TRANSFORM_NAME
  | typeof COMMAND_TRANSLATIONS_NAME
  | typeof COMMAND_UPGRADE_NAME
  | typeof COMMAND_ZIP_NAME
  | typeof COMMAND_AUTOLOAD_NAME;

export enum VerbosityLevel {
  Verbose = 1,
  VeryVerbose = 2,
  VeryVeryVerbose = 3,
}

export const REGEX_VERSION = /(v?\d+\.\d+\.\d+(?:-\w+\.\d+)?)/;

export const DEFAULT_JSON_SPACES = 2;

export enum PdkPlatformName {
  MyParcelBe = 'myparcelbe',
  MyParcelNl = 'myparcelnl',
}

export const PLATFORM_SHEET_ID_MAP = {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  [PdkPlatformName.MyParcelBe]: 286749530,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  [PdkPlatformName.MyParcelNl]: 1550017884,
} satisfies Record<PdkPlatformName, number>;

export const COMMIT_TYPE_AUTO = 'auto';

export const OPTION_VERBOSITY = [
  '-v, --verbose',
  'Output verbosity.',
  (_: string, prev: number) => prev + 1,
  0,
] as const;

export const OPTION_QUIET = ['-q, --quiet', 'Quiet all output.'] as const;

export const OPTION_DRY_RUN = ['-d, --dry-run', 'Do not change any files.'] as const;

export const OPTION_PARALLEL = ['-p, --parallel', 'Run commands for each platform in parallel.'] as const;

export const OPTION_DOCKER_COMMAND = [
  '--docker-command <command>',
  'Prefix to run a command in a Docker container.',
] as const;

/**
 * @deprecated Use OPTION_DOCKER_COMMAND instead.
 * @TODO Remove in v2.0.0
 */
export const OPTION_ROOT_COMMAND = ['--root-command <command>', 'Deprecated. Use --docker-command instead.'] as const;

export const OPTION_VERSION = ['--version <version>', 'The new version string. Example: "1.2.3".'] as const;

export const CONFIG_OPTIONS = [OPTION_DOCKER_COMMAND, OPTION_ROOT_COMMAND, OPTION_VERSION] as const;

export const BULK_COMMAND_OPTIONS = [OPTION_DRY_RUN, OPTION_PARALLEL, OPTION_VERBOSITY, OPTION_QUIET] as const;

export const MYPARCEL_PDK_PACKAGIST_NAME = 'myparcelnl/pdk';

export const MYPARCEL_PDK_APP_BUILDER = '@myparcel-pdk/app-builder';

export const MYPARCEL_PDK_NPM_GLOB = '@myparcel-pdk/*';

export const RUN_COMPOSER = 'composer';

export const RUN_YARN = 'yarn';

export const RUN_NPM = 'npm';

export const RUN_PHP = 'php';

export const SOURCE_PLATFORM = PdkPlatformName.MyParcelNl;
