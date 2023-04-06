import {AdminConfiguration} from '../';
import {useAdminInstance} from './useAdminInstance';

export const useAdminConfig = (): AdminConfiguration => {
  const instance = useAdminInstance();

  return instance.config;
};
