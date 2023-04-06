import {PdkLogger} from '../services';
import {useAdminInstance} from './useAdminInstance';

export const useLogger = (): PdkLogger => {
  const instance = useAdminInstance();

  return instance.logger;
};
