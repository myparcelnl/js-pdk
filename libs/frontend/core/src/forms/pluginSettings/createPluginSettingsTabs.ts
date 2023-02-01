import {EndpointName, PdkTab, Plugin} from '@myparcel-pdk/common';
import {ContextKey} from '../../types';
import {FormInstance} from '@myparcel/vue-form-builder';
import {ResolvedQuery} from '../../stores';
import {TabNavigation} from '../../components';
import {createActionContext} from '../../services';
import {createFormTab} from './createFormTab';
import {createPluginSettingsForm} from './createPluginSettingsForm';
import {h} from 'vue';
import {pluginSettingsUpdateAction} from '../../actions';
import {useLanguage} from '../../composables';

export interface FormTab extends Omit<PdkTab, 'component'> {
  form: FormInstance;
}

type CreatePluginSettingsTabs = (created: {
  view: Plugin.ModelContextPluginSettingsViewContext;
  mutation: ResolvedQuery<EndpointName.UPDATE_PLUGIN_SETTINGS>;
  query: ResolvedQuery<`${EndpointName.FETCH_CONTEXT}.${ContextKey.PLUGIN_SETTINGS_VIEW}`>;
}) => PdkTab[];

export const createPluginSettingsTabs: CreatePluginSettingsTabs = ({view, mutation, query}) => {
  const actionContext = createActionContext(pluginSettingsUpdateAction);

  return Object.entries(view).map(([id, view]) => {
    const tab = {
      name: id,
      label: view.title,
    };

    if (id !== 'carrier' && !view.children.length) {
      return createFormTab({
        ...tab,
        form: createPluginSettingsForm(id, view, actionContext, mutation, query),
      });
    }

    if (!view.children.length) {
      const language = useLanguage();

      return {
        ...tab,
        component: h('div', {}, language.translate(`view_${id}_empty`)),
      };
    }

    return {
      ...tab,
      component: () => {
        return h('div', {}, [
          h(TabNavigation, {
            hashPrefix: `${view.id}-`,
            tabs: view.children.map((subview) =>
              createFormTab({
                name: `${id}.${subview.id}`,
                label: subview.title,
                description: subview.description,
                form: createPluginSettingsForm(`${id}.${subview.id}`, subview, actionContext, mutation, query),
              }),
            ),
          }),
        ]);
      },
    };
  });
};
