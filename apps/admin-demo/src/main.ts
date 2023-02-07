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
  DemoTabNavButton,
  DemoTabNavButtonWrapper,
  DemoTabNavContentWrapper,
  DemoTable,
  DemoTableCol,
  DemoTableRow,
  DemoTextInput,
  DemoToggleInput,
} from './components';
import {LogLevel, createPdkAdminPlugin} from '@myparcel-pdk/frontend-core/src';
import App from './App.vue';
import {DefaultHeading} from '@myparcel-pdk/admin-components/src';
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
  createPdkAdminPlugin({
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
      PdkHeading: DefaultHeading,
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
      PdkTabNavButton: DemoTabNavButton,
      PdkTabNavButtonWrapper: DemoTabNavButtonWrapper,
      PdkTabNavContentWrapper: DemoTabNavContentWrapper,
      PdkTable: DemoTable,
      PdkTableCol: DemoTableCol,
      PdkTableRow: DemoTableRow,
      PdkTextInput: DemoTextInput,
      PdkToggleInput: DemoToggleInput,
    },
  }),
);

app.mount('#app');
