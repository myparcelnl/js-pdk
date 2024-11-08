/* eslint-disable @typescript-eslint/naming-convention,@typescript-eslint/ban-types,@typescript-eslint/no-unnecessary-type-arguments,@typescript-eslint/no-explicit-any */

import {
  type ComponentOptionsMixin,
  type ComputedOptions,
  type DefineComponent as RealDefineComponent,
  type ExtractDefaultPropTypes,
  type MethodOptions,
  type SlotsType,
} from 'vue';
import {type PublicProps} from '@vue/runtime-core';
import {
  type BadgeProps,
  type BadgeSlots,
  type BoxEmits,
  type BoxProps,
  type BoxSlots,
  type ButtonEmits,
  type ButtonGroupProps,
  type ButtonGroupSlots,
  type ButtonProps,
  type ButtonSlots,
  type CheckboxGroupEmits,
  type CheckboxGroupProps,
  type CheckboxInputEmits,
  type CheckboxInputProps,
  type CodeEditorEmits,
  type CodeEditorProps,
  type ColProps,
  type ColSlots,
  type ConceptBoxWrapperProps,
  type CurrencyInputEmits,
  type CurrencyInputProps,
  type DropdownButtonProps,
  type DropdownButtonSlots,
  type DropOffInputEmits,
  type DropOffInputProps,
  type FormGroupProps,
  type FormGroupSlots,
  type HeadingProps,
  type HeadingSlots,
  type IconProps,
  type ImageProps,
  type LinkEmits,
  type LinkProps,
  type LinkSlots,
  type LoaderProps,
  type ModalProps,
  type ModalSlots,
  type MultiSelectInputEmits,
  type MultiSelectInputProps,
  type NotificationProps,
  type NumberInputEmits,
  type NumberInputProps,
  type PluginSettingsWrapperProps,
  type RadioGroupEmits,
  type RadioGroupProps,
  type RadioInputEmits,
  type RadioInputProps,
  type RowProps,
  type RowSlots,
  type SelectInputEmits,
  type SelectInputProps,
  type SettingsDividerProps,
  type ShipmentLabelWrapperProps,
  type ShipmentLabelWrapperSlots,
  type ShippingMethodsInputEmits,
  type ShippingMethodsInputProps,
  type TableColProps,
  type TableColSlots,
  type TableProps,
  type TableRowProps,
  type TableRowSlots,
  type TableSlots,
  type TabNavButtonEmits,
  type TabNavButtonProps,
  type TabNavButtonWrapperProps,
  type TabNavButtonWrapperSlots,
  type TabNavContentWrapperProps,
  type TabNavContentWrapperSlots,
  type TextAreaEmits,
  type TextAreaProps,
  type TextInputEmits,
  type TextInputProps,
  type TimeInputEmits,
  type TimeInputProps,
  type ToggleInputEmits,
  type ToggleInputProps,
  type TriStateInputEmits,
  type TriStateInputProps,
} from './admin/src/types';

/**
 * @note This file should NOT be imported. Its purpose is to resolve the global pdk components in your IDE.
 *
 * @see createRegisterComponentsPlugin
 */

type DefineComponent<Props, Emits = {}, Slots extends Record<string, any> = {}> = RealDefineComponent<
  Props,
  Emits,
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  {},
  {},
  string,
  PublicProps,
  Props,
  ExtractDefaultPropTypes<Props>,
  SlotsType<Slots>
>;

export declare const PdkBadge: DefineComponent<BadgeProps, {}, BadgeSlots>;

export declare const PdkBox: DefineComponent<BoxProps, BoxEmits, BoxSlots>;

export declare const PdkButton: DefineComponent<ButtonProps, ButtonEmits, ButtonSlots>;

export declare const PdkButtonGroup: DefineComponent<ButtonGroupProps, {}, ButtonGroupSlots>;

export declare const PdkCheckboxGroup: DefineComponent<CheckboxGroupProps, CheckboxGroupEmits>;

export declare const PdkCheckboxInput: DefineComponent<CheckboxInputProps, CheckboxInputEmits>;

export declare const PdkCodeEditor: DefineComponent<CodeEditorProps, CodeEditorEmits>;

export declare const PdkCol: DefineComponent<ColProps, {}, ColSlots>;

export declare const PdkConceptBoxWrapper: DefineComponent<ConceptBoxWrapperProps>;

export declare const PdkCurrencyInput: DefineComponent<CurrencyInputProps, CurrencyInputEmits>;

export declare const PdkDropOffInput: DefineComponent<DropOffInputProps, DropOffInputEmits>;

export declare const PdkDropdownButton: DefineComponent<DropdownButtonProps, {}, DropdownButtonSlots>;

export declare const PdkFormGroup: DefineComponent<FormGroupProps, {}, FormGroupSlots>;

export declare const PdkHeading: DefineComponent<HeadingProps, {}, HeadingSlots>;

export declare const PdkIcon: DefineComponent<IconProps>;

export declare const PdkImage: DefineComponent<ImageProps>;

export declare const PdkLink: DefineComponent<LinkProps, LinkEmits, LinkSlots>;

export declare const PdkLoader: DefineComponent<LoaderProps>;

export declare const PdkModal: DefineComponent<ModalProps, {}, ModalSlots>;

export declare const PdkMultiSelectInput: DefineComponent<MultiSelectInputProps, MultiSelectInputEmits>;

export declare const PdkNotification: DefineComponent<NotificationProps>;

export declare const PdkNumberInput: DefineComponent<NumberInputProps, NumberInputEmits>;

export declare const PdkPluginSettingsWrapper: DefineComponent<PluginSettingsWrapperProps>;

export declare const PdkRadioGroup: DefineComponent<RadioGroupProps, RadioGroupEmits>;

export declare const PdkRadioInput: DefineComponent<RadioInputProps, RadioInputEmits>;

export declare const PdkRow: DefineComponent<RowProps, {}, RowSlots>;

export declare const PdkSelectInput: DefineComponent<SelectInputProps, SelectInputEmits>;

export declare const PdkSettingsDivider: DefineComponent<SettingsDividerProps>;

export declare const PdkShipmentLabelWrapper: DefineComponent<ShipmentLabelWrapperProps, {}, ShipmentLabelWrapperSlots>;

export declare const PdkShippingMethodsInput: DefineComponent<ShippingMethodsInputProps, ShippingMethodsInputEmits>;

export declare const PdkTabNavButton: DefineComponent<TabNavButtonProps, TabNavButtonEmits>;

export declare const PdkTabNavButtonWrapper: DefineComponent<TabNavButtonWrapperProps, {}, TabNavButtonWrapperSlots>;

export declare const PdkTabNavContentWrapper: DefineComponent<TabNavContentWrapperProps, {}, TabNavContentWrapperSlots>;

export declare const PdkTable: DefineComponent<TableProps, {}, TableSlots>;

export declare const PdkTableCol: DefineComponent<TableColProps, {}, TableColSlots>;

export declare const PdkTableRow: DefineComponent<TableRowProps, {}, TableRowSlots>;

export declare const PdkTextArea: DefineComponent<TextAreaProps, TextAreaEmits>;

export declare const PdkTextInput: DefineComponent<TextInputProps, TextInputEmits>;

export declare const PdkTimeInput: DefineComponent<TimeInputProps, TimeInputEmits>;

export declare const PdkToggleInput: DefineComponent<ToggleInputProps, ToggleInputEmits>;

export declare const PdkTriStateInput: DefineComponent<TriStateInputProps, TriStateInputEmits>;
