import './assets/css/icons.css';
import './assets/css/tailwind.css';
import {AdminContextKey, LogLevel, createPdkAdminPlugin} from '@myparcel-pdk/frontend-core/src';
import {
  DefaultButtonGroup,
  DefaultCheckboxInput,
  DefaultCol,
  DefaultCurrencyInput,
  DefaultDropOffInput,
  DefaultHeading,
  DefaultLink,
  DefaultLoader,
  DefaultMultiCheckbox,
  DefaultMultiRadio,
  DefaultNumberInput,
  DefaultRadioInput,
  DefaultTable,
  DefaultTableCol,
  DefaultTableRow,
  DefaultTimeInput,
  DefaultToggleInput,
} from '@myparcel-pdk/admin-components/src';
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
  // todo allow global context to be loaded dynamically
  const globalContextPromise = fetch(`http://localhost:3059/pdk?action=fetchContext&context=global`);
  // todo allow dynamic context to be loaded dynamically (hehe)
  const dynamicContextPromise = fetch(`http://localhost:3059/pdk?action=fetchContext&context=dynamic`);
  // todo allow plugin settings view context to be loaded dynamically
  const pluginSettingsViewContextPromise = fetch(
    `http://localhost:3059/pdk?action=fetchContext&context=pluginSettingsView`,
  );

  const app = createApp(App);

  app.use(createRouterInstance());

  const [globalContext, dynamicContext, pluginSettingsViewContext] = await Promise.all(
    [globalContextPromise, dynamicContextPromise, pluginSettingsViewContextPromise].map(async (promise) =>
      (await promise).json(),
    ),
  );

  const pdkAdminPlugin = createPdkAdminPlugin(
    {
      logLevel: LogLevel.DEBUG,
      components: {
        PdkBox: DemoBox,
        PdkButton: DemoButton,
        PdkButtonGroup: DefaultButtonGroup,
        PdkCheckboxInput: DefaultCheckboxInput,
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
        PdkMultiCheckbox: DefaultMultiCheckbox,
        PdkMultiRadio: DefaultMultiRadio,
        PdkNotification: DemoNotification,
        PdkNumberInput: DefaultNumberInput,
        PdkPluginSettingsWrapper: DemoPluginSettingsWrapper,
        PdkRadioInput: DefaultRadioInput,
        PdkRow: DemoRow,
        PdkSelectInput: DemoSelectInput,
        PdkTabNavButton: DemoTabNavButton,
        PdkTable: DefaultTable,
        PdkTableCol: DefaultTableCol,
        PdkTableRow: DefaultTableRow,
        PdkTextInput: DemoTextInput,
        PdkTimeInput: DefaultTimeInput,
        PdkToggleInput: DefaultToggleInput,
      },
    },
    {
      [AdminContextKey.GLOBAL]: globalContext.data.context[0][AdminContextKey.GLOBAL],
      [AdminContextKey.DYNAMIC]: dynamicContext.data.context[0][AdminContextKey.DYNAMIC],
      [AdminContextKey.PLUGIN_SETTINGS_VIEW]:
        pluginSettingsViewContext.data.context[0][AdminContextKey.PLUGIN_SETTINGS_VIEW],
    },
  );

  app.use(pdkAdminPlugin);

  app.mount('#app');
})();
