import {AdminContextKey} from '@myparcel-pdk/common';
import {type AdminContextObject} from '../../types/context.types';
import {useContext} from './useContext';

export const useGlobalContext = (): AdminContextObject['global'] => {
  return useContext(AdminContextKey.Global);
};
