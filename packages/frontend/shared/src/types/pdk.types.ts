import {ContextKey, InstanceContextKey, PdkContext} from './context.types';
import {Component} from 'vue';
import {RequireOnly} from './utils.types';

export type PdkComponentName =
  | 'PdkAccordion'
  | 'PdkAlert'
  | 'PdkButton'
  | 'PdkCard'
  | 'PdkCheckbox'
  | 'PdkDropdownButton'
  | 'PdkDropdownButtonItem'
  | 'PdkFormGroup'
  | 'PdkIcon'
  | 'PdkInput'
  | 'PdkModal'
  | 'PdkMultiCheckbox'
  | 'PdkRadio'
  | 'PdkSelect'
  | 'PdkTable'
  | 'PdkTableCol'
  | 'PdkTableRow';

export type PdkRenderComponent =
  | 'LoadingPage'
  | 'Modals'
  | 'ModuleSettings'
  | 'Notifications'
  | 'OrderCard'
  | 'OrderListColumn';

export type PdkContextObject = {
  [key in ContextKey | InstanceContextKey]: PdkContext<key>;
};

export type FinalPdkContextObject = RequireOnly<Partial<PdkContextObject>, ContextKey.GLOBAL>;

export type ComponentMap = {
  [K in PdkComponentName]: Component;
};

export type ComponentImportFunction = () => Promise<{default: Component}>;
