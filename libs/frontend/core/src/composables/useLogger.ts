import {PdkLogger} from '../services';
import {usePdkInstance} from './usePdkInstance';

export const useLogger = (): PdkLogger => {
  const instance = usePdkInstance();

  return instance.logger;
};
