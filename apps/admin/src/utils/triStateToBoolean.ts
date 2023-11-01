import {TriState} from '../data';

export const triStateToBoolean = (value: TriState): boolean => {
  return TriState.Inherit === value ? false : Boolean(value);
};
