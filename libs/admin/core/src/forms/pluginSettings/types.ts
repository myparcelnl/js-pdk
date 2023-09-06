import {type Plugin, type TabDefinition} from '@myparcel-pdk/admin-common';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {type AdminAction, type AdminConfiguration} from '../../types';
import {type ActionContext} from '../../actions';

export interface FormTab extends Omit<TabDefinition, 'component'> {
  form: FormInstance;
}

export type PluginSettingsTabsContext = {
  pluginSettings: Plugin.ModelContextDynamicContext['pluginSettings'];
  actionContext: ActionContext<AdminAction.PluginSettingsUpdate>;
  config: AdminConfiguration;
};
