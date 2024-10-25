import {type AdminConfiguration} from '../types/configuration.types';
import {useAdminInstance} from './useAdminInstance';

export const useAdminConfig = (): AdminConfiguration => {
  const instance = useAdminInstance();

  return instance.config;
};
