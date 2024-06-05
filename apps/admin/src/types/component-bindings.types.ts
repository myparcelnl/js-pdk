import {type Keyable, type Settings, type ShippingMethodTypeMap, type TriState} from '@myparcel-pdk/common';
import {type OptionsProp, type PdkElementEmits, type PdkElementProps, type SelectOptionValue} from './form.types';
import {type ArrayItem} from './common.types';

/**
 * @see AdminComponent.CheckboxGroup
 */
export type CheckboxGroupModelValue = string | boolean;

export type CheckboxGroupProps<T extends CheckboxGroupModelValue> = PdkElementProps<T>;

export type CheckboxGroupEmits<T extends CheckboxGroupModelValue> = PdkElementEmits<T>;

/**
 * @see AdminComponent.CurrencyInput
 */
export type CurrencyInputModelValue = string | number;

export type CurrencyInputProps = PdkElementProps<CurrencyInputModelValue>;

export type CurrencyInputEmits = PdkElementEmits<number>;

/**
 * @see AdminComponent.CheckboxInput
 */

export type CheckboxInputModelValue = Keyable | boolean;

export type CheckboxInputProps<T extends CheckboxInputModelValue> = PdkElementProps<T>;

export type CheckboxInputEmits<T extends CheckboxInputModelValue> = PdkElementEmits<T>;

/**
 * @see AdminComponent.CodeEditor
 */

export type CodeEditorModelValue = TextInputModelValue;

export type CodeEditorProps = PdkElementProps<CodeEditorModelValue>;

export type CodeEditorEmits = PdkElementEmits<CodeEditorModelValue>;

/**
 * @see AdminComponent.DropOffInput
 */
export type DropOffInputModelValue = Settings.ModelDropOffPossibilities;

export type DropOffInputProps = PdkElementProps<DropOffInputModelValue>;

export type DropOffInputEmits = PdkElementEmits<DropOffInputModelValue>;

/**
 * @see AdminComponent.SelectInput
 */

export type SelectInputModelValue = SelectOptionValue;

export type SelectInputProps<T extends SelectInputModelValue> = PdkElementProps<T, OptionsProp<T>>;

export type SelectInputEmits<T extends SelectInputModelValue> = PdkElementEmits<T>;

/**
 * @see AdminComponent.MultiSelectInput
 */

export type MultiSelectInputModelValue = SelectOptionValue[];

export type MultiSelectInputProps<T extends MultiSelectInputModelValue> = SelectInputProps<ArrayItem<T>>;

export type MultiSelectInputEmits<T extends MultiSelectInputModelValue> = SelectInputEmits<ArrayItem<T>>;

/**
 * @see AdminComponent.NumberInput
 */

export type NumberInputModelValue = string | number;

export type NumberInputProps = PdkElementProps<NumberInputModelValue>;

export type NumberInputEmits = PdkElementEmits<number>;

/**
 * @see AdminComponent.RadioGroup
 */

export type RadioGroupModelValue = Keyable;

export type RadioGroupProps<T extends RadioGroupModelValue> = PdkElementProps<T, OptionsProp<T>>;

export type RadioGroupEmits<T extends RadioGroupModelValue> = PdkElementEmits<T>;
/**
 * @see AdminComponent.RadioInput
 */

export type RadioInputModelValue = string | number;

export type RadioInputProps = PdkElementProps<RadioInputModelValue>;

export type RadioInputEmits = PdkElementEmits<string>;

/**
 * @see AdminComponent.TextInput
 */

export type TextInputModelValue = string;

export type TextInputProps = PdkElementProps<TextInputModelValue>;

export type TextInputEmits = PdkElementEmits<TextInputModelValue>;

/**
 * @see AdminComponent.TextArea
 */

export type TextAreaModelValue = string;

export type TextAreaProps = PdkElementProps<TextAreaModelValue>;

export type TextAreaEmits = PdkElementEmits<TextAreaModelValue>;

/**
 * @see AdminComponent.TimeInput
 */

export type TimeInputModelValue = string;

export type TimeInputProps = PdkElementProps<TimeInputModelValue>;

export type TimeInputEmits = PdkElementEmits<TimeInputModelValue>;

/**
 * @see AdminComponent.ToggleInput
 */

export type ToggleInputModelValue = boolean;

export type ToggleInputProps = PdkElementProps<ToggleInputModelValue>;

export type ToggleInputEmits = PdkElementEmits<ToggleInputModelValue>;

/**
 * @see AdminComponent.TriStateInput
 */

export type TriStateInputModelValue = TriState;

export type TriStateInputProps = PdkElementProps<
  TriStateInputModelValue,
  {
    defaultValue?: TriStateInputModelValue;
  }
>;

export type TriStateInputEmits = PdkElementEmits<TriStateInputModelValue>;

/**
 * @see AdminComponent.ShippingMethodsInput
 */

export type ShippingMethodsInputModelValue = ShippingMethodTypeMap;

export type ShippingMethodsInputProps<T extends ShippingMethodsInputModelValue = ShippingMethodsInputModelValue> =
  PdkElementProps<T, OptionsProp<string>>;

export type ShippingMethodsInputEmits<T extends ShippingMethodsInputModelValue = ShippingMethodsInputModelValue> =
  PdkElementEmits<T>;
