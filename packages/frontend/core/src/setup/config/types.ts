import {ComponentMap, PdkContextObject} from '@myparcel/pdk-frontend-shared';
import {PiniaPluginContext} from 'pinia';

export type InputPdkConfiguration = {
  components: ComponentMap;

  onCreateStore?: (piniaContext: PiniaPluginContext) => void;
  onCreated?: (pdkFrontend?: FinalPdkConfiguration) => void;
};

export type FinalPdkConfiguration = {
  context: PdkContextObject;
  components: ComponentMap;

  onCreateStore?: (piniaContext: PiniaPluginContext) => void;
  onCreated?: (pdkFrontend?: FinalPdkConfiguration) => void;
};

export type DefaultPdkConfiguration = {
  context?: Partial<PdkContextObject>;
  components?: Record<string, undefined>;
  pluginSettings?: Record<string, undefined>;
};
