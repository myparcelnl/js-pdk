import {inject} from 'vue';
import {PdkAdmin} from '../pdk';
import {INJECT_GLOBAL_PDK_ADMIN} from '../data';

export const useGlobalPdkAdmin = (): PdkAdmin => {
  const pdkAdmin = inject(INJECT_GLOBAL_PDK_ADMIN);

  if (!pdkAdmin) {
    throw new Error('PDK frontend not found. First use createPdkAdmin() to create the global instance.');
  }

  return pdkAdmin;
};
