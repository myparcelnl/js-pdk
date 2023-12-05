import {type AdminContextObject} from '../../types';
import {AdminContextKey} from '../../data';
import {useContext} from './useContext';

export const useGlobalContext = (): AdminContextObject['global'] => {
  return useContext(AdminContextKey.Global);
};
