import {inject} from 'vue';
import {INJECT_GLOBAL_PDK_ADMIN} from '../symbols';
import {type PdkAdmin} from '../pdk/PdkAdmin';

export const useGlobalPdkAdmin = (): PdkAdmin => {
  const pdkAdmin = inject(INJECT_GLOBAL_PDK_ADMIN);

  if (!pdkAdmin) {
    throw new Error('PDK frontend not found. First use createPdkAdmin() to create the global instance.');
  }

  return pdkAdmin;
};
