import {PdkFormatterObject, PdkComponentMap, IetfLanguageTag} from '@myparcel-pdk/common';
import {PdkContextObject} from './context.types';
import {PiniaPluginContext} from 'pinia';
import {LogLevel} from 'vite';

export type DefaultPdkConfiguration = Omit<FinalPdkConfiguration, 'context' | 'components'> & {
  context?: Partial<PdkContextObject>;
  components?: Record<string, undefined>;
  formatters?: Record<string, undefined>;
};

export type FinalPdkConfiguration = InputPdkConfiguration & {
  context: PdkContextObject;
};

export type InputPdkConfiguration = {
  /**
   * Components to use.
   */
  components: PdkComponentMap;

  /**
   * Override default formatters.
   */
  formatters?: PdkFormatterObject;

  /**
   * IETF language tag.
   *
   * @example en-US
   * @example nl-NL
   */
  locale: IetfLanguageTag;

  /**
   * Log level to use. Defaults to 'info' on production and 'debug' on development.
   */
  logLevel?: LogLevel;

  /**
   * Hook that executes when a store is created.
   */
  onCreateStore?: (piniaContext: PiniaPluginContext) => void;

  /**
   * Hook that executes when the pdk frontend is booted.
   */
  onCreated?: (pdkFrontend?: FinalPdkConfiguration) => void;

  /**
   * Transition names.
   */
  transitions?: {
    labelCard?: string;
    notification?: string;
    shipmentRow?: string;
    tableRow?: string;
  };
};
