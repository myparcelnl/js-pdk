import {TriState} from '@myparcel-dev/pdk-common';

export const triStateToBoolean = (value: TriState): boolean => {
  return TriState.Inherit === value ? false : Boolean(value);
};
