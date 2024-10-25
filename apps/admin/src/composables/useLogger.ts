import {type PdkLogger} from '../services/logger';
import {useAdminInstance} from './useAdminInstance';

export const useLogger = (): PdkLogger => {
  const instance = useAdminInstance();

  return instance.logger;
};
