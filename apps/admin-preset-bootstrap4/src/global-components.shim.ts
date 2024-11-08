// noinspection DuplicatedCode

import {createApp} from 'vue';
import {
  PdkBadge,
  PdkBox,
  PdkButton,
  PdkButtonGroup,
  PdkCheckboxGroup,
  PdkCheckboxInput,
  PdkCodeEditor,
  PdkCol,
  PdkConceptBoxWrapper,
  PdkCurrencyInput,
  PdkDropdownButton,
  PdkDropOffInput,
  PdkFormGroup,
  PdkHeading,
  PdkIcon,
  PdkImage,
  PdkLink,
  PdkLoader,
  PdkModal,
  PdkMultiSelectInput,
  PdkNotification,
  PdkNumberInput,
  PdkPluginSettingsWrapper,
  PdkRadioGroup,
  PdkRadioInput,
  PdkRow,
  PdkSelectInput,
  PdkSettingsDivider,
  PdkShipmentLabelWrapper,
  PdkShippingMethodsInput,
  PdkTable,
  PdkTableCol,
  PdkTableRow,
  PdkTabNavButton,
  PdkTabNavButtonWrapper,
  PdkTabNavContentWrapper,
  PdkTextArea,
  PdkTextInput,
  PdkTimeInput,
  PdkToggleInput,
  PdkTriStateInput,
} from '../../admin-components.shim';

/**
 * DO NOT IMPORT!
 *
 * This lets your IDE know about the global pdk admin components and resolve its types. They're not actually registered
 * this way and this code is not really used.
 *
 * @see createRegisterComponentsPlugin
 */
createApp({})
  .component('PdkBadge', PdkBadge)
  .component('PdkBox', PdkBox)
  .component('PdkButton', PdkButton)
  .component('PdkButtonGroup', PdkButtonGroup)
  .component('PdkCheckboxGroup', PdkCheckboxGroup)
  .component('PdkCheckboxInput', PdkCheckboxInput)
  .component('PdkCodeEditor', PdkCodeEditor)
  .component('PdkCol', PdkCol)
  .component('PdkConceptBoxWrapper', PdkConceptBoxWrapper)
  .component('PdkCurrencyInput', PdkCurrencyInput)
  .component('PdkDropOffInput', PdkDropOffInput)
  .component('PdkDropdownButton', PdkDropdownButton)
  .component('PdkFormGroup', PdkFormGroup)
  .component('PdkHeading', PdkHeading)
  .component('PdkIcon', PdkIcon)
  .component('PdkImage', PdkImage)
  .component('PdkLink', PdkLink)
  .component('PdkLoader', PdkLoader)
  .component('PdkModal', PdkModal)
  .component('PdkMultiSelectInput', PdkMultiSelectInput)
  .component('PdkNotification', PdkNotification)
  .component('PdkNumberInput', PdkNumberInput)
  .component('PdkPluginSettingsWrapper', PdkPluginSettingsWrapper)
  .component('PdkRadioGroup', PdkRadioGroup)
  .component('PdkRadioInput', PdkRadioInput)
  .component('PdkRow', PdkRow)
  .component('PdkSelectInput', PdkSelectInput)
  .component('PdkSettingsDivider', PdkSettingsDivider)
  .component('PdkShipmentLabelWrapper', PdkShipmentLabelWrapper)
  .component('PdkShippingMethodsInput', PdkShippingMethodsInput)
  .component('PdkTabNavButton', PdkTabNavButton)
  .component('PdkTabNavButtonWrapper', PdkTabNavButtonWrapper)
  .component('PdkTabNavContentWrapper', PdkTabNavContentWrapper)
  .component('PdkTable', PdkTable)
  .component('PdkTableCol', PdkTableCol)
  .component('PdkTableRow', PdkTableRow)
  .component('PdkTextArea', PdkTextArea)
  .component('PdkTextInput', PdkTextInput)
  .component('PdkTimeInput', PdkTimeInput)
  .component('PdkToggleInput', PdkToggleInput)
  .component('PdkTriStateInput', PdkTriStateInput);
