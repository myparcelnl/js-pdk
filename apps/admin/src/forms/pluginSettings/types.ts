import {type Plugin} from '@myparcel-pdk/common';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {type AdminConfiguration} from '../../types/configuration.types';
import {type TabDefinition} from '../../types/common.types';
import {type AdminAction} from '../../data/constants';
import {type ActionContext} from '../../actions/executors/types';

export interface FormTab extends Omit<TabDefinition, 'component'> {
  form: FormInstance;
}

export type PluginSettingsTabsContext = {
  pluginSettings: Plugin.ModelContextDynamicContext['pluginSettings'];
  actionContext: ActionContext<AdminAction.PluginSettingsUpdate>;
  config: AdminConfiguration;
};
