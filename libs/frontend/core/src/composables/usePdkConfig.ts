import {FinalPdkConfiguration, INJECT_PDK_INSTANCE} from '../';
import {inject} from 'vue';

export const usePdkConfig = (): undefined | FinalPdkConfiguration => {
  const pdk = inject(INJECT_PDK_INSTANCE);

  return pdk?.config;
};
