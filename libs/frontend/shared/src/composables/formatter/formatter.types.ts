import {IetfLanguageTag} from '@myparcel-pdk/frontend-core';

/**
 * Available formatters.
 */
export type FormatName = 'currency' | 'dateLong' | 'dateRelative' | string;

export type FormatterFunction = (input: unknown, ...args: unknown[]) => string;

export type PdkFormatterObject = Record<FormatName, FormatterFunction>;

export type LocaleFormatterObject = Record<IetfLanguageTag, PdkFormatterObject>;

export type Formatter = {
  /**
   * Get all registered formatters
   */
  getFormatters: (locale: IetfLanguageTag) => PdkFormatterObject;

  /**
   * Format a value into a string using the given format.
   */
  format: (format: FormatName, input: unknown) => string;
};
