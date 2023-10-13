import {type Keyable} from '@myparcel-pdk/common/src';
import {type SelectOption} from '@myparcel-pdk/admin-common';
import {TriStateValue} from '@myparcel-pdk/admin';

export const createDefaultOption = (value?: Keyable | undefined): SelectOption => ({
  label: {
    key: 'option_inherit_value',
    args: {
      value: value ?? '?',
    },
  },
  value: TriStateValue.Inherit,
});
