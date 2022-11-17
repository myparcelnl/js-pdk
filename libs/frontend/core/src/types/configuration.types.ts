import {ComponentMap} from '@myparcel-pdk/frontend-shared';
import {PdkContextObject} from './context.types';
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
