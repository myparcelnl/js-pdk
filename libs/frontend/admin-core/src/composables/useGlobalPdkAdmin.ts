import {INJECT_GLOBAL_PDK_ADMIN} from '../data';
import {PdkAdmin} from '../pdk';
import {inject} from 'vue';

export const useGlobalPdkAdmin = (): PdkAdmin => {
  const pdkAdmin = inject(INJECT_GLOBAL_PDK_ADMIN);

  if (!pdkAdmin) {
    throw new Error('PDK frontend not found. First use createPdkAdmin() to create the global instance.');
  }

  return pdkAdmin;
};
