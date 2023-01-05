import './assets/css/tailwind.css';
import {
  DemoButton,
  DemoButtonGroup,
  DemoCard,
  DemoCheckboxInput,
  DemoCol,
  DemoCurrencyInput,
  DemoDropdownButton,
  DemoFormGroup,
  DemoIcon,
  DemoImage,
  DemoLink,
  DemoModal,
  DemoMultiCheckbox,
  DemoMultiRadio,
  DemoNotification,
  DemoNumberInput,
  DemoPluginSettingsWrapper,
  DemoRadioInput,
  DemoRow,
  DemoSelectInput,
  DemoTable,
  DemoTableCol,
  DemoTableRow,
  DemoTextInput,
  DemoToggleInput,
} from './components';
import {LogLevel, createPdkFrontendPlugin} from '@myparcel-pdk/frontend-core';
import App from './App.vue';
import {context} from './context';
import {createApp} from 'vue';
import {createRouterInstance} from './router';

const div = document.createElement('div');

div.setAttribute('id', 'myparcel-pdk-boot');
div.setAttribute('data-pdk-context', JSON.stringify(context));
document.body.appendChild(div);

const app = createApp(App);

app.use(createRouterInstance());

app.use(
  createPdkFrontendPlugin({
    logLevel: LogLevel.DEBUG,
    components: {
      PdkButton: DemoButton,
      PdkButtonGroup: DemoButtonGroup,
      PdkCard: DemoCard,
      PdkCheckboxInput: DemoCheckboxInput,
      PdkCol: DemoCol,
      PdkCurrencyInput: DemoCurrencyInput,
      PdkDropdownButton: DemoDropdownButton,
      PdkFormGroup: DemoFormGroup,
      PdkIcon: DemoIcon,
      PdkImage: DemoImage,
      PdkLink: DemoLink,
      PdkModal: DemoModal,
      PdkMultiCheckbox: DemoMultiCheckbox,
      PdkMultiRadio: DemoMultiRadio,
      PdkNotification: DemoNotification,
      PdkNumberInput: DemoNumberInput,
      PdkPluginSettingsWrapper: DemoPluginSettingsWrapper,
      PdkRadioInput: DemoRadioInput,
      PdkRow: DemoRow,
      PdkSelectInput: DemoSelectInput,
      PdkTable: DemoTable,
      PdkTableCol: DemoTableCol,
      PdkTableRow: DemoTableRow,
      PdkTextInput: DemoTextInput,
      PdkToggleInput: DemoToggleInput,
    },
  }),
);

app.mount('#app');
