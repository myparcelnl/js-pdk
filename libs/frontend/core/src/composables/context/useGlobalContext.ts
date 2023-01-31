import {PdkContextObject} from '../../types';
import {useContextStore} from '../../stores';

export const useGlobalContext = (): PdkContextObject['global'] => {
  const contextStore = useContextStore();

  return contextStore.context.global;
};
