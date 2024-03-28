export const TITLE = 'pdk-builder';

export const COMMAND_BUILD_NAME = 'build';

export const COMMAND_CLEAN_NAME = 'clean';

export const COMMAND_COPY_NAME = 'copy';

export const COMMAND_DUMP_AUTOLOAD_NAME = 'dump-autoload';

export const COMMAND_INCREMENT_NAME = 'increment';

export const COMMAND_INIT_NAME = 'init';

export const COMMAND_PRERELEASE_NAME = 'prerelease';

export const COMMAND_RELEASE_NAME = 'release';

export const COMMAND_RENAME_NAME = 'rename';

export const COMMAND_SCOPE_PHP_NAME = 'scope-php';

export const COMMAND_TRANSFORM_NAME = 'transform';

export const COMMAND_TRANSLATIONS_NAME = 'translations';

export const COMMAND_UPGRADE_NAME = 'upgrade';

export const COMMAND_UPGRADE_ALL_NAME = 'upgrade-all';

export const COMMAND_ZIP_NAME = 'zip';

export type CommandName =
  | typeof COMMAND_CLEAN_NAME
  | typeof COMMAND_COPY_NAME
  | typeof COMMAND_DUMP_AUTOLOAD_NAME
  | typeof COMMAND_INCREMENT_NAME
  | typeof COMMAND_INIT_NAME
  | typeof COMMAND_RENAME_NAME
  | typeof COMMAND_SCOPE_PHP_NAME
  | typeof COMMAND_TRANSFORM_NAME
  | typeof COMMAND_TRANSLATIONS_NAME
  | typeof COMMAND_UPGRADE_NAME
  | typeof COMMAND_ZIP_NAME;

export enum VerbosityLevel {
  Verbose = 1,
  VeryVerbose = 2,
  VeryVeryVerbose = 3,
}

export const REGEX_VERSION = /(v?\d+\.\d+\.\d+(?:-\w+\.\d+)?)/;

export const DEFAULT_JSON_SPACES = 2;

export enum PdkPlatformName {
  Flespakket = 'flespakket',
  MyParcelBe = 'myparcelbe',
  MyParcelNl = 'myparcelnl',
}

export const PLATFORM_SHEET_ID_MAP = {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  [PdkPlatformName.Flespakket]: 286749530,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  [PdkPlatformName.MyParcelBe]: 286749530,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  [PdkPlatformName.MyParcelNl]: 1550017884,
} satisfies Record<PdkPlatformName, number>;

export const COMMIT_TYPE_AUTO = 'auto';

export const OPTION_VERBOSITY = ['-v, --verbose', 'Verbosity', (_: string, prev: number) => prev + 1, 0] as const;

export const OPTION_QUIET = ['-q, --quiet', 'Quiet'] as const;

export const OPTION_DRY_RUN = ['-d, --dry-run', 'Dry run'] as const;

export const OPTION_PARALLEL = ['-p, --parallel', 'Run each platform in parallel'] as const;

export const CONFIG_OPTIONS = [
  ['--archive-file-name <filename>', 'Archive filename'],
  ['--platform-folder-name <name>', 'Platform folder name'],
  ['--root-command <command>', 'Root command'],
  ['--version <version>', 'New version'],
] as const;

export const BULK_COMMAND_OPTIONS = [
  OPTION_DRY_RUN,
  OPTION_PARALLEL,
  OPTION_VERBOSITY,
  OPTION_QUIET,
  ...CONFIG_OPTIONS,
] as const;

export const MYPARCEL_PDK_PACKAGIST_NAME = 'myparcelnl/pdk';

export const MYPARCEL_PDK_NPM_GLOB = '@myparcel-pdk/*';
