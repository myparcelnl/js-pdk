export enum SeparateAddressField {
  Street = 'street',
  Number = 'number',
  NumberSuffix = 'numberSuffix',
}

export const ATTRIBUTE_AUTOCOMPLETE = 'autocomplete';

export const SPLIT_STREET_REGEX =
  /(.*?)\s?(\d{1,4})[/\s-]{0,2}([A-z]\d{1,3}|-\d{1,4}|\d{2}\w{1,2}|[A-z][A-z\s]{0,3})?$/;

/**
 * Separate address fields definitions. The order of the fields is important.
 */
export const SEPARATE_ADDRESS_FIELDS_WITHOUT_SUFFIX = [
  SeparateAddressField.Street,
  SeparateAddressField.Number,
] as const;

export const SEPARATE_ADDRESS_FIELDS = [
  ...SEPARATE_ADDRESS_FIELDS_WITHOUT_SUFFIX,
  SeparateAddressField.NumberSuffix,
] as const;
