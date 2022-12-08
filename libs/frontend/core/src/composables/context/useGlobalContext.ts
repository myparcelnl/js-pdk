import {AnyContext, ContextKey, PdkContext} from '../../types';
import {WritableComputedRef, computed, ref} from 'vue';

type ContextRef<Key extends ContextKey> = WritableComputedRef<PdkContext<Key>>;

interface UseGlobalContext {
  <Key extends ContextKey>(contextKey: Key, context?: PdkContext<Key> | null): ContextRef<Key>;
  <Key extends ContextKey>(contextKey: Key, context: undefined): ContextRef<Key>;
}

const cache: ContextRef<ContextKey>[] = [];

/**
 * Get a globally defined context, filtered by `context.id` and `context.orderId`.
 */
export const useGlobalContext: UseGlobalContext = (contextKey, context?) => {
  const localEntry = ref<WritableComputedRef<AnyContext>>();

  return computed({
    get() {
      // const foundEntry = cache.find((item) => {
      //   const orderIdMatches = orderId.value ? orderId.value === item.value.orderId : true;
      //   return contextKey === item.value.id && orderIdMatches;
      // })?.value;

      // if (!foundEntry) {
      //   const localContext = ref<AnyContext>(useInstanceContext(context ?? contextKey));
      //
      //   const createdEntry = computed({
      //     get() {
      //       return localContext.value;
      //     },
      //     set(context: AnyContext) {
      //       localContext.value = context;
      //     },
      //   });
      //
      //   cache.push(createdEntry);
      //   foundEntry.value = createdEntry;
      // }

      // localEntry.value = foundEntry;

      return cache[0] as unknown as AnyContext;
    },

    set(context: AnyContext) {
      if (localEntry.value) {
        localEntry.value.value = context;
      }
    },
  });
};
