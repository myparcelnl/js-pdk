import {PdkConfiguration} from '../';
import {usePdkInstance} from './usePdkInstance';

export const usePdkConfig = (): PdkConfiguration => {
  const instance = usePdkInstance();

  return instance.config;
};
