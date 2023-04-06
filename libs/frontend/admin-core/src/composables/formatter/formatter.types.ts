import {Ref} from 'vue';

export enum Format {
  Currency = 'currency',
  DateLong = 'dateLong',
  DateRelative = 'dateRelative',
  Weekday = 'weekday',
}

export type FormatName = Format | string;

export type FormatterFunction = (input: unknown, ...args: unknown[]) => string;

export type FormatterObject = Record<FormatName, FormatterFunction>;

export type LocaleFormatterObject = Record<string, FormatterObject>;

export type Formatter = {
  /**
   * Get all registered formatters
   */
  getFormatters(locale: string): FormatterObject;

  /**
   * Format a value into a string using the given format.
   */
  format(format: FormatName, input: unknown): string;

  formats: Ref<LocaleFormatterObject>;
};

export type FormatterTranslateFunction = (string?: string) => string;
