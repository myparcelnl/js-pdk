import {type Keyable} from '@myparcel-pdk/common';
import {type SelectOption} from '../../types';
import {TriState} from '../../data';

export const createDefaultOption = (value?: Keyable | undefined): SelectOption => ({
  label: {
    key: 'option_inherit_value',
    args: {
      value: value ?? '?',
    },
  },
  value: TriState.Inherit,
});
