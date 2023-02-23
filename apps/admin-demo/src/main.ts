import './assets/css/tailwind.css';
import {
  DefaultButtonGroup,
  DefaultCheckboxInput,
  DefaultCol,
  DefaultCurrencyInput,
  DefaultDropOffInput,
  DefaultDropdownButton,
  DefaultHeading,
  DefaultLink,
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
  DemoFormGroup,
  DemoIcon,
  DemoImage,
  DemoModal,
  DemoNotification,
  DemoPluginSettingsWrapper,
  DemoRow,
  DemoSelectInput,
  DemoTabNavButton,
  DemoTextInput,
} from './components';
import {LogLevel, createPdkAdminPlugin} from '@myparcel-pdk/frontend-core/src';
import App from './App.vue';
import {context} from './context';
import {createApp} from 'vue';
import {createRouterInstance} from './router';
import {useDemoOrderData} from './composables';

const div = document.createElement('div');

div.setAttribute('id', 'myparcel-pdk-boot');
div.setAttribute('data-pdk-context', JSON.stringify(context));
document.body.appendChild(div);

const app = createApp(App);

app.use(createRouterInstance());

app.use(
  createPdkAdminPlugin(
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
        PdkDropdownButton: DefaultDropdownButton,
        PdkFormGroup: DemoFormGroup,
        PdkHeading: DefaultHeading,
        PdkIcon: DemoIcon,
        PdkImage: DemoImage,
        PdkLink: DefaultLink,
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
    {...context, orderData: useDemoOrderData()},
  ),
);

app.mount('#app');
