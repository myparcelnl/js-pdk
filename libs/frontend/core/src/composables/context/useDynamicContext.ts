import {Plugin} from '@myparcel-pdk/common';
import {useContextStore} from '../../stores';

export const useDynamicContext = (): Plugin.ModelContextDynamicContext => {
  const contextStore = useContextStore();

  if (!contextStore.context.dynamic) {
    throw new Error('Dynamic context is not available');
  }

  return contextStore.context.dynamic;
};
