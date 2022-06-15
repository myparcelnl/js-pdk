import {ContextKey, MyParcelContext} from '@/data/global/context';
import {WritableComputedRef} from 'vue';
import {getInstanceContext} from '@/data/global/getInstanceContext';
import {useGlobalContext} from '@/composables/context/useGlobalContext';

type UseGlobalInstanceContext = <Key extends ContextKey>(contextKey: Key) => WritableComputedRef<MyParcelContext<Key>>;

export const useGlobalInstanceContext: UseGlobalInstanceContext = (contextKey) => {
  return useGlobalContext(contextKey, getInstanceContext(contextKey));
};
