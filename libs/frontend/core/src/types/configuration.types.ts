import {FormConfiguration} from '@myparcel/vue-form-builder/src';
import {LogLevel} from '../services';
import {PdkComponentMap} from '@myparcel-pdk/common/src';
import {PdkFormatterObject} from '../composables';
import {PiniaPluginContext} from 'pinia';

export type DefaultPdkConfiguration = Omit<PdkConfiguration, 'context' | 'components'> & {
  components?: Record<string, undefined>;
  formatters?: Record<string, undefined>;
};

export type PdkConfiguration = {
  /**
   * Components to use.
   */
  components: PdkComponentMap;

  /**
   * Override default formatters.
   */
  formatters?: PdkFormatterObject;

  /**
   * Log level to use. Defaults to 'info' on production and 'debug' on development.
   */
  logLevel?: LogLevel;

  /**
   * Configuration to pass to @myparcel/vue-form-builder.
   */
  formConfig?: Omit<FormConfiguration, 'fields'>;

  formConfigPluginSettings?: Omit<FormConfiguration, 'fields'>;

  formConfigProductSettings?: Omit<FormConfiguration, 'fields'>;

  /**
   * Transition names.
   */
  transitions?: {
    shipmentBox?: string;
    modal?: string;
    modalBackdrop?: string;
    notification?: string;
    shipmentRow?: string;
    tabNavigation?: string;
    tableRow?: string;
  };

  /**
   * Css classes for common utility usage.
   */
  cssUtilities?: {
    animationSpin?: string;
    textCenter?: string;
    textColorError?: string;
    textColorSuccess?: string;
    whitespaceNoWrap?: string;
  };

  /**
   * Hook that executes when a store is created.
   */
  onCreateStore?(piniaContext: PiniaPluginContext): void;

  /**
   * Hook that executes before the pdk frontend is booted.
   */
  beforeCreate?(configuration?: PdkConfiguration): void;

  /**
   * Hook that executes after the pdk frontend is booted.
   */
  onCreated?(configuration?: PdkConfiguration): void;
};

export type PdkConfigurationPreset = Omit<Partial<PdkConfiguration>, 'components'>;
