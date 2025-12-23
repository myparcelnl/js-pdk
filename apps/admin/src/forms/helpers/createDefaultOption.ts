import {type Keyable, TriState} from '@myparcel-dev/pdk-common';
import {type SelectOption} from '../../types';

export const createDefaultOption = (value?: Keyable | undefined): SelectOption => ({
  label: {
    key: 'option_inherit_value',
    args: {
      value: value ?? '?',
    },
  },
  value: TriState.Inherit,
});
