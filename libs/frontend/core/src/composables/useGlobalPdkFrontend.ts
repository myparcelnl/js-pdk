import {INJECT_GLOBAL_PDK_FRONTEND} from '../data';
import {PdkFrontend} from '../pdk';
import {inject} from 'vue';

export const useGlobalPdkFrontend = (): PdkFrontend => {
  const pdkFrontend = inject(INJECT_GLOBAL_PDK_FRONTEND);

  if (!pdkFrontend) {
    throw new Error('PDK frontend not found. First use createPdkFrontend() to create the global instance.');
  }

  return pdkFrontend;
};
