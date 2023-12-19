import {TriState} from '@myparcel-pdk/common';

export const toTriState = (value?: unknown): TriState => {
  if (TriState.Inherit === value) {
    return value;
  }

  return value ? TriState.On : TriState.Off;
};
