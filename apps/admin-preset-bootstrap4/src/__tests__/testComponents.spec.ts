import {
  Bootstrap4Button,
  Bootstrap4ButtonGroup,
  Bootstrap4Card,
  Bootstrap4CheckboxInput,
  Bootstrap4Col,
  Bootstrap4DropdownButton,
  Bootstrap4FormGroup,
  Bootstrap4Image,
  Bootstrap4Modal,
  Bootstrap4Notification,
  Bootstrap4NumberInput,
  Bootstrap4RadioInput,
  Bootstrap4Row,
  Bootstrap4SelectInput,
  Bootstrap4Table,
  Bootstrap4TextInput,
} from '../components';
import {executePdkComponentTests} from '@myparcel-pdk/admin-component-tests/src';

executePdkComponentTests({
  PdkButton: Bootstrap4Button,
  PdkButtonGroup: Bootstrap4ButtonGroup,
  PdkCard: Bootstrap4Card,
  PdkCheckboxInput: Bootstrap4CheckboxInput,
  PdkCol: Bootstrap4Col,
  PdkDropdownButton: Bootstrap4DropdownButton,
  PdkFormGroup: Bootstrap4FormGroup,
  PdkImage: Bootstrap4Image,
  PdkModal: Bootstrap4Modal,
  PdkNotification: Bootstrap4Notification,
  PdkNumberInput: Bootstrap4NumberInput,
  PdkRadioInput: Bootstrap4RadioInput,
  PdkRow: Bootstrap4Row,
  PdkSelectInput: Bootstrap4SelectInput,
  PdkTable: Bootstrap4Table,
  PdkTextInput: Bootstrap4TextInput,
});
