import './assets/css/icons.css';
import './assets/css/tailwind.css';
import {AdminContextKey, LogLevel, createPdkAdminPlugin} from '@myparcel-pdk/frontend-admin-core/src';
import {
  DefaultButtonGroup,
  DefaultCheckboxGroup,
  DefaultCheckboxInput,
  DefaultCodeEditor,
  DefaultCol,
  DefaultCurrencyInput,
  DefaultDropOffInput,
  DefaultHeading,
  DefaultLink,
  DefaultLoader,
  DefaultNumberInput,
  DefaultRadioGroup,
  DefaultRadioInput,
  DefaultTable,
  DefaultTableCol,
  DefaultTableRow,
  DefaultTextArea,
  DefaultTimeInput,
  DefaultToggleInput,
} from '@myparcel-pdk/admin-preset-default/src';
import {
  DemoBox,
  DemoButton,
  DemoDropdownButton,
  DemoFormGroup,
  DemoImage,
  DemoModal,
  DemoNotification,
  DemoPluginSettingsWrapper,
  DemoRow,
  DemoSelectInput,
  DemoTabNavButton,
  DemoTextInput,
} from './components';
import App from './App.vue';
import {FontAwesomeIcon} from '@myparcel-pdk/admin-preset-fontawesome/src';
import {createApp} from 'vue';
import {createRouterInstance} from './router';

void (async () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // todo allow global context to be loaded dynamically
  const globalContextPromise = fetch(`${apiUrl}/pdk?action=fetchContext&context=global`);
  // todo allow dynamic context to be loaded dynamically (hehe)
  const dynamicContextPromise = fetch(`${apiUrl}/pdk?action=fetchContext&context=dynamic`);
  // todo allow plugin settings view context to be loaded dynamically
  const pluginSettingsViewContextPromise = fetch(`${apiUrl}/pdk?action=fetchContext&context=pluginSettingsView`);

  const app = createApp(App);

  app.use(createRouterInstance());

  const [globalContext, dynamicContext, pluginSettingsViewContext] = await Promise.all(
    [globalContextPromise, dynamicContextPromise, pluginSettingsViewContextPromise].map(async (promise) =>
      (await promise).json(),
    ),
  );

  const pdkAdminPlugin = createPdkAdminPlugin(
    {
      logLevel: LogLevel.Debug,
      components: {
        PdkBox: DemoBox,
        PdkButton: DemoButton,
        PdkButtonGroup: DefaultButtonGroup,
        PdkCheckboxGroup: DefaultCheckboxGroup,
        PdkCheckboxInput: DefaultCheckboxInput,
        PdkCodeEditor: DefaultCodeEditor,
        PdkCol: DefaultCol,
        PdkCurrencyInput: DefaultCurrencyInput,
        PdkDropOffInput: DefaultDropOffInput,
        PdkDropdownButton: DemoDropdownButton,
        PdkFormGroup: DemoFormGroup,
        PdkHeading: DefaultHeading,
        PdkIcon: FontAwesomeIcon,
        PdkImage: DemoImage,
        PdkLink: DefaultLink,
        PdkLoader: DefaultLoader,
        PdkModal: DemoModal,
        PdkNotification: DemoNotification,
        PdkNumberInput: DefaultNumberInput,
        PdkPluginSettingsWrapper: DemoPluginSettingsWrapper,
        PdkRadioGroup: DefaultRadioGroup,
        PdkRadioInput: DefaultRadioInput,
        PdkRow: DemoRow,
        PdkSelectInput: DemoSelectInput,
        PdkTabNavButton: DemoTabNavButton,
        PdkTable: DefaultTable,
        PdkTableCol: DefaultTableCol,
        PdkTableRow: DefaultTableRow,
        PdkTextArea: DefaultTextArea,
        PdkTextInput: DemoTextInput,
        PdkTimeInput: DefaultTimeInput,
        PdkToggleInput: DefaultToggleInput,
      },
    },
    {
      [AdminContextKey.Global]: globalContext.data.context[0][AdminContextKey.Global],
      [AdminContextKey.Dynamic]: dynamicContext.data.context[0][AdminContextKey.Dynamic],
      [AdminContextKey.PluginSettingsView]:
        pluginSettingsViewContext.data.context[0][AdminContextKey.PluginSettingsView],
    },
  );

  app.use(pdkAdminPlugin);

  app.mount('#app');
})();
