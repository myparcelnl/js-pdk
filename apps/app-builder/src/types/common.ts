import {type PdkPlatformName} from '../constants';

export type StringGenerator = string | ((platform?: PdkPlatformName) => string);

export type NpmInfo = Record<string, unknown> & {
  repository?:
    | {
        url: string;
      }
    | string;
};

export type StringContaining<S extends string> = `${string}${S}${string}` | `${string}${S}` | `${S}${string}` | `${S}`;
