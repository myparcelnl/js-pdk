import {PdkPlatformName} from './types';

export const TITLE = 'pdk-builder';

export const COMMAND_BUILD_NAME = 'build';

export const COMMAND_CLEAN_NAME = 'clean';

export const COMMAND_COPY_NAME = 'copy';

export const COMMAND_INCREMENT_NAME = 'increment';

export const COMMAND_INIT_NAME = 'init';

export const COMMAND_RELEASE_NAME = 'release';

export const COMMAND_RENAME_NAME = 'rename';

export const COMMAND_TRANSFORM_NAME = 'transform';

export const COMMAND_TRANSLATIONS_NAME = 'translations';

export const COMMAND_UPGRADE_NAME = 'upgrade';

export const COMMAND_ZIP_NAME = 'zip';

export const ALL_COMMAND_NAMES = [
  COMMAND_CLEAN_NAME,
  COMMAND_COPY_NAME,
  COMMAND_INCREMENT_NAME,
  COMMAND_INIT_NAME,
  COMMAND_RENAME_NAME,
  COMMAND_TRANSFORM_NAME,
  COMMAND_TRANSLATIONS_NAME,
  COMMAND_UPGRADE_NAME,
  COMMAND_ZIP_NAME,
] as const;

export type CommandName = (typeof ALL_COMMAND_NAMES)[number];

export enum VerbosityLevel {
  Verbose = 1,
  VeryVerbose = 2,
  VeryVeryVerbose = 3,
}

export const REGEX_VERSION = /(v?\d+\.\d+\.\d+(?:-\w+\.\d+)?)/;

export const DEFAULT_JSON_SPACES = 2;

export const PLATFORM_SHEET_ID_MAP = {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  [PdkPlatformName.Flespakket]: 286749530,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  [PdkPlatformName.MyParcelBe]: 286749530,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  [PdkPlatformName.MyParcelNl]: 1550017884,
} satisfies Record<PdkPlatformName, number>;
