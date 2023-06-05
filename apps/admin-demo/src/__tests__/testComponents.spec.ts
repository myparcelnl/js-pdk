import {executePdkComponentTests} from '@myparcel-pdk/admin-component-tests';
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
  DemoBadge,
  DemoDropdownButton,
  DemoTable,
} from '../components';

executePdkComponentTests({
  Badge: DemoBadge,
  Box: DemoBox,
  Button: DemoButton,
  DropdownButton: DemoDropdownButton,
  FormGroup: DemoFormGroup,
  Image: DemoImage,
  Modal: DemoModal,
  Notification: DemoNotification,
  PluginSettingsWrapper: DemoPluginSettingsWrapper,
  Row: DemoRow,
  SelectInput: DemoSelectInput,
  TabNavButton: DemoTabNavButton,
  Table: DemoTable,
  TextInput: DemoTextInput,
});
