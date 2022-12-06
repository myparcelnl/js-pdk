import {LogLevel, PdkComponentMap} from '@myparcel-pdk/frontend-shared';
import {PdkContextObject} from './context.types';
import {PiniaPluginContext} from 'pinia';

export type DefaultPdkConfiguration = Omit<FinalPdkConfiguration, 'context' | 'components'> & {
  context?: Partial<PdkContextObject>;
  components?: Record<string, undefined>;
};

export type FinalPdkConfiguration = InputPdkConfiguration & {
  context: PdkContextObject;
};

export type InputPdkConfiguration = {
  components: PdkComponentMap;

  /**
   * Log level to use. Defaults to 'info' on production and 'debug' on development.
   */
  logLevel?: LogLevel;

  /**
   * Hook that executes when the pdk frontend is booted.
   */
  onCreated?: (pdkFrontend?: FinalPdkConfiguration) => void;

  /**
   * Hook that executes when a store is created.
   */
  onCreateStore?: (piniaContext: PiniaPluginContext) => void;

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
