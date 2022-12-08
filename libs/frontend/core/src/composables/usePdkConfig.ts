import {FinalPdkConfiguration, INJECT_PDK_INSTANCE} from '../';
import {inject} from 'vue';

export const usePdkConfig = (): FinalPdkConfiguration => {
  const pdk = inject(INJECT_PDK_INSTANCE);

  if (!pdk) {
    throw new Error('No PDK instance found');
  }

  return pdk.config;
};
