import {type Keyable} from '@myparcel-pdk/common';

export interface NonTranslatable {
  text: string;
}

export interface Translatable {
  key: string;
  args?: Record<Keyable, Keyable>;
}

export type Translation = string | Translatable | NonTranslatable;
