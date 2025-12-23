import {type PiniaPluginContext} from 'pinia';
import {type FormConfiguration, type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {type MakeOptional} from '@myparcel-dev/ts-utils';
import {type LogLevel} from '../services';
import {type FORM_KEYS} from '../forms';
import {type FormatterObject} from '../composables';
import {type AdminContextObject} from './context.types';
import {type AdminComponentMap, type PrefixedAdminComponentMap} from './admin.types';

export type DefaultAdminConfiguration = Omit<AdminConfiguration, 'context' | 'components' | 'generateFieldId'> & {
  components?: Record<string, undefined>;
  formatters: Record<string, undefined>;
  generateFieldId(element: InteractiveElementInstance): string;
};

export type AdminConfiguration = {
  /**
   * Components to use.
   */
  components: AdminComponentMap | PrefixedAdminComponentMap;

  /**
   * Override default formatters.
   */
  formatters?: FormatterObject;

  /**
   * Log level to use. Defaults to 'info' on production and 'debug' on development.
   */
  logLevel: LogLevel;

  /**
   * Configuration to pass to @myparcel-dev/vue-form-builder.
   */
  formConfig?: Omit<FormConfiguration, 'fields'>;

  /**
   * Overrides per form.
   */
  formConfigOverrides?: Partial<
    Record<
      (typeof FORM_KEYS)[number],
      Omit<FormConfiguration, 'fields'> & {
        /**
         * Callback to generate a field id.
         */
        generateFieldId?(element: InteractiveElementInstance): string;
      }
    >
  >;

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

  /**
   * Callback to generate a field id.
   */
  generateFieldId(element: InteractiveElementInstance): string;
};

export type AdminConfigurationPreset = Omit<Partial<AdminConfiguration>, 'components'>;

export type InputAdminConfiguration = MakeOptional<AdminConfiguration, 'generateFieldId'>;
