import {PiniaPluginContext} from 'pinia';
import {AdminComponentMap} from '@myparcel-pdk/common';
import {FormConfiguration} from '@myparcel/vue-form-builder';
import {LogLevel} from '../services';
import {FORM_KEYS} from '../forms/formKeys';
import {FormatterObject} from '../composables';
import {AdminContextObject} from './context.types';

export type DefaultAdminConfiguration = Omit<AdminConfiguration, 'context' | 'components'> & {
  components?: Record<string, undefined>;
  formatters?: Record<string, undefined>;
};

export type AdminConfiguration = {
  /**
   * Components to use.
   */
  components: AdminComponentMap;

  /**
   * Override default formatters.
   */
  formatters?: FormatterObject;

  /**
   * Log level to use. Defaults to 'info' on production and 'debug' on development.
   */
  logLevel?: LogLevel;

  /**
   * Configuration to pass to @myparcel/vue-form-builder.
   */
  formConfig?: Omit<FormConfiguration, 'fields'>;

  /**
   * Overrides per form.
   */
  formConfigOverrides?: Partial<Record<(typeof FORM_KEYS)[number], Omit<FormConfiguration, 'fields'>>>;

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
    animationLoading?: string;
    animationSpin?: string;
    cursorDefault?: string;
    cursorPointer?: string;
    displayFlex?: string;
    flexGrow?: string;
    marginLAuto?: string;
    marginYAuto?: string;
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
   * Hook that executes before an app is created.
   */
  beforeRender?(configuration: AdminConfiguration): void;

  /**
   * Hook that executes after an app is created.
   */
  onRendered?(configuration: AdminConfiguration): void;

  /**
   * Hook that executes before the pdk admin is created.
   */
  beforeInitialize?(configuration: AdminConfiguration, context: AdminContextObject): void;

  /**
   * Hook that executes after the pdk admin is created.
   */
  onInitialized?(configuration: AdminConfiguration, context: AdminContextObject): void;
};

export type AdminConfigurationPreset = Omit<Partial<AdminConfiguration>, 'components'>;
