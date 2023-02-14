import {ContextQuery, ResolvedQuery} from '../../stores';
import {BackendEndpoint, Plugin, TabDefinition} from '@myparcel-pdk/common/src';
import {FormInstance} from '@myparcel/vue-form-builder/src';
import {TabNavigation} from '../../components';
import {createActionContext} from '../../services';
import {createFormTab} from './createFormTab';
import {createPluginSettingsForm} from './createPluginSettingsForm';
import {h} from 'vue';
import {pluginSettingsUpdateAction} from '../../actions';
import {useLanguage} from '../../composables';

export interface FormTab extends Omit<TabDefinition, 'component'> {
  form: FormInstance;
}

export type PluginSettingsTabsContext = {
  mutation: ResolvedQuery<BackendEndpoint.UPDATE_PLUGIN_SETTINGS>;
  query: ContextQuery;
};

type CreatePluginSettingsTabs = (
  data: PluginSettingsTabsContext & {view: Plugin.ModelContextPluginSettingsViewContext},
) => TabDefinition[];

export const createPluginSettingsTabs: CreatePluginSettingsTabs = ({view, mutation, query}) => {
  const actionContext = createActionContext(pluginSettingsUpdateAction);

  return Object.entries(view).map(([id, view]) => {
    const tab = {
      name: id,
      label: view.title,
    };

    if (!view.children) {
      return createFormTab({
        ...tab,
        form: createPluginSettingsForm(id, view, actionContext, {mutation, query}),
      });
    }

    if (!view.children.length) {
      const {translate} = useLanguage();

      return {
        ...tab,
        component: h('div', {}, translate(`view_${id}_empty`)),
      };
    }

    return {
      ...tab,
      component: () => {
        return h('div', {}, [
          h(TabNavigation, {
            hashPrefix: `${view.id}-`,
            tabs: (view.children ?? []).map((subview) =>
              createFormTab({
                name: `${id}.${subview.id}`,
                label: subview.title,
                description: subview.description,
                form: createPluginSettingsForm(`${id}.${subview.id}`, subview, actionContext, {mutation, query}),
              }),
            ),
          }),
        ]);
      },
    };
  });
};
