import {TriState} from '@myparcel-pdk/common';

export const booleanToTriState = (value?: boolean): TriState.On | TriState.Off => {
  return value ? TriState.On : TriState.Off;
};
