import {TriState} from '../data';

export const toTriState = (value?: unknown): TriState => {
  if (TriState.Inherit === value) {
    return value;
  }

  return value ? TriState.On : TriState.Off;
};
