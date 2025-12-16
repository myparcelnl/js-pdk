import {TriState} from '@myparcel-dev/pdk-common';

export const booleanToTriState = (value?: boolean): TriState.On | TriState.Off => {
  return value ? TriState.On : TriState.Off;
};
