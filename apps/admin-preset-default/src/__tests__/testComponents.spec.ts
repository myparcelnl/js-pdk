import {executePdkComponentTests} from '@myparcel-pdk/admin-component-tests';
import {AdminComponent} from '@myparcel-pdk/admin';
import {
  DefaultBadge,
  DefaultBox,
  DefaultButton,
  DefaultButtonGroup,
  DefaultCheckboxGroup,
  DefaultCheckboxInput,
  DefaultCodeEditor,
  DefaultCol,
  DefaultCurrencyInput,
  DefaultDropdownButton,
  DefaultDropOffInput,
  DefaultFormGroup,
  DefaultHeading,
  DefaultIcon,
  DefaultImage,
  DefaultLink,
  DefaultLoader,
  DefaultModal,
  DefaultMultiSelectInput,
  DefaultNotification,
  DefaultNumberInput,
  DefaultRadioGroup,
  DefaultRadioInput,
  DefaultRow,
  DefaultSelectInput,
  DefaultSettingsDivider,
  DefaultShippingMethodsInput,
  DefaultTable,
  DefaultTableCol,
  DefaultTableRow,
  DefaultTabNavButton,
  DefaultTextArea,
  DefaultTextInput,
  DefaultTimeInput,
  DefaultToggleInput,
  DefaultTriStateInput,
} from '../components';

executePdkComponentTests({
  [AdminComponent.Badge]: DefaultBadge,
  [AdminComponent.Box]: DefaultBox,
  [AdminComponent.Button]: DefaultButton,
  [AdminComponent.ButtonGroup]: DefaultButtonGroup,
  [AdminComponent.CheckboxGroup]: DefaultCheckboxGroup,
  [AdminComponent.CheckboxInput]: DefaultCheckboxInput,
  [AdminComponent.CodeEditor]: DefaultCodeEditor,
  [AdminComponent.Col]: DefaultCol,
  [AdminComponent.CurrencyInput]: DefaultCurrencyInput,
  // TODO: fix error caused by weekdaysObject being undefined in DefaultDropOffInput
  // [AdminComponent.DropOffInput]: DefaultDropOffInput,
  [AdminComponent.DropdownButton]: DefaultDropdownButton,
  [AdminComponent.FormGroup]: DefaultFormGroup,
  [AdminComponent.Heading]: DefaultHeading,
  [AdminComponent.Icon]: DefaultIcon,
  [AdminComponent.Image]: DefaultImage,
  [AdminComponent.Link]: DefaultLink,
  [AdminComponent.Loader]: DefaultLoader,
  [AdminComponent.Modal]: DefaultModal,
  [AdminComponent.MultiSelectInput]: DefaultMultiSelectInput,
  [AdminComponent.Notification]: DefaultNotification,
  [AdminComponent.NumberInput]: DefaultNumberInput,
  [AdminComponent.RadioGroup]: DefaultRadioGroup,
  [AdminComponent.RadioInput]: DefaultRadioInput,
  [AdminComponent.Row]: DefaultRow,
  [AdminComponent.SelectInput]: DefaultSelectInput,
  [AdminComponent.SettingsDivider]: DefaultSettingsDivider,
  [AdminComponent.ShippingMethodsInput]: DefaultShippingMethodsInput,
  [AdminComponent.TabNavButton]: DefaultTabNavButton,
  [AdminComponent.Table]: DefaultTable,
  [AdminComponent.TableCol]: DefaultTableCol,
  [AdminComponent.TableRow]: DefaultTableRow,
  [AdminComponent.TextArea]: DefaultTextArea,
  [AdminComponent.TextInput]: DefaultTextInput,
  [AdminComponent.TimeInput]: DefaultTimeInput,
  [AdminComponent.ToggleInput]: DefaultToggleInput,
  [AdminComponent.TriStateInput]: DefaultTriStateInput,
});
