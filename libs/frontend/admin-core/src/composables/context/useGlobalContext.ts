import {AdminContextKey, AdminContextObject} from '../../types';
import {useContext} from './useContext';

export const useGlobalContext = (): AdminContextObject['global'] => {
  return useContext(AdminContextKey.Global);
};
