import {type PackageJson} from 'nx/src/utils/package-json';

export type StringGenerator = string | ((platform?: PdkPlatformName) => string);

export enum PdkPlatformName {
  Flespakket = 'flespakket',
  MyParcelBe = 'myparcelbe',
  MyParcelNl = 'myparcelnl',
}

export type NpmInfo = PackageJson & {
  repository?:
    | {
        url: string;
      }
    | string;
};

export type StringContaining<S extends string> = `${string}${S}${string}` | `${string}${S}` | `${S}${string}` | `${S}`;
