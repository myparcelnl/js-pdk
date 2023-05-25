import {
  DemoBox,
  DemoButton,
  DemoFormGroup,
  DemoImage,
  DemoModal,
  DemoNotification,
  DemoPluginSettingsWrapper,
  DemoRow,
  DemoSelectInput,
  DemoTabNavButton,
  DemoTextInput,
} from '../components';
import {executePdkComponentTests} from '@myparcel-pdk/admin-component-tests';

executePdkComponentTests({
  PdkBox: DemoBox,
  PdkButton: DemoButton,
  PdkFormGroup: DemoFormGroup,
  PdkImage: DemoImage,
  PdkModal: DemoModal,
  PdkNotification: DemoNotification,
  PdkPluginSettingsWrapper: DemoPluginSettingsWrapper,
  PdkRow: DemoRow,
  PdkSelectInput: DemoSelectInput,
  PdkTabNavButton: DemoTabNavButton,
  PdkTextInput: DemoTextInput,
});
