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
} from '../components';
import {executePdkComponentTests} from '@myparcel-pdk/admin-component-tests/src';

executePdkComponentTests({
  PdkBox: DemoBox,
  PdkButton: DemoButton,
  PdkFormGroup: DemoFormGroup,
  PdkIcon: DemoIcon,
  PdkImage: DemoImage,
  PdkModal: DemoModal,
  PdkNotification: DemoNotification,
  PdkPluginSettingsWrapper: DemoPluginSettingsWrapper,
  PdkRow: DemoRow,
  PdkSelectInput: DemoSelectInput,
  PdkTabNavButton: DemoTabNavButton,
  PdkTextInput: DemoTextInput,
});
