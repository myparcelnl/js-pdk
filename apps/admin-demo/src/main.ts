import './assets/css/icons.css';
import './assets/css/tailwind.css';
import './assets/css/global.css';
import './assets/css/transitions.css';
import './assets/css/forms.css';
import {AdminContextKey, LogLevel, createPdkAdminPlugin} from '@myparcel-pdk/frontend-admin-core';
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
  DefaultMultiSelectInput,
  DefaultNumberInput,
  DefaultRadioGroup,
  DefaultRadioInput,
  DefaultTableCol,
  DefaultTableRow,
  DefaultTextArea,
  DefaultTimeInput,
  DefaultToggleInput,
} from '@myparcel-pdk/admin-preset-default';
import {
  DemoBadge,
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
  DemoTable,
  DemoTextInput,
} from './components';
import App from './App.vue';
import {FontAwesomeIcon} from '@myparcel-pdk/admin-preset-fontawesome';
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
      cssUtilities: {
        animationLoading: 'animate-pulse',
        animationSpin: 'animate-spin',
        cursorDefault: 'cursor-default',
        cursorPointer: 'cursor-pointer',
        displayFlex: 'flex',
        flexGrow: 'flex-grow',
        marginLAuto: 'ml-auto',
        marginYAuto: 'my-auto',
        textCenter: 'text-center',
        textColorError: 'text-red-600',
        textColorSuccess: 'text-green-600',
        whitespaceNoWrap: 'whitespace-nowrap',
      },
      components: {
        PdkBadge: DemoBadge,
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
        PdkMultiSelectInput: DefaultMultiSelectInput,
        PdkNotification: DemoNotification,
        PdkNumberInput: DefaultNumberInput,
        PdkPluginSettingsWrapper: DemoPluginSettingsWrapper,
        PdkRadioGroup: DefaultRadioGroup,
        PdkRadioInput: DefaultRadioInput,
        PdkRow: DemoRow,
        PdkSelectInput: DemoSelectInput,
        PdkTabNavButton: DemoTabNavButton,
        PdkTable: DemoTable,
        PdkTableCol: DefaultTableCol,
        PdkTableRow: DefaultTableRow,
        PdkTextArea: DefaultTextArea,
        PdkTextInput: DemoTextInput,
        PdkTimeInput: DefaultTimeInput,
        PdkToggleInput: DefaultToggleInput,
      },
      transitions: {
        modal: 'slide-up',
        modalBackdrop: 'fade',
        notification: 'slide-up',
        shipmentBox: 'slide-up',
        shipmentRow: 'slide-up',
        tabNavigation: 'slide-up',
        tableRow: 'slide-up',
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
