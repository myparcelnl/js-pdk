import {type ComputedRef, computed} from 'vue';
import {type OrderMode, resolveOrderMode} from '../../data';
import {useContext} from './useContext';

export const useOrderMode = (): ComputedRef<OrderMode> => {
  const context = useContext();

  return computed(() => resolveOrderMode(context.account?.subscriptionFeatures ?? []));
};
