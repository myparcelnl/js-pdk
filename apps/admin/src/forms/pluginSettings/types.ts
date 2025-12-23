import {type Plugin} from '@myparcel-dev/pdk-common';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {type AdminConfiguration, type TabDefinition} from '../../types';
import {type AdminAction} from '../../data';
import {type ActionContext} from '../../actions';

export interface FormTab extends Omit<TabDefinition, 'component'> {
  form: FormInstance;
}

export type PluginSettingsTabsContext = {
  pluginSettings: Plugin.ModelContextDynamicContext['pluginSettings'];
  actionContext: ActionContext<AdminAction.PluginSettingsUpdate>;
  config: AdminConfiguration;
};
