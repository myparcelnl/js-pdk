import {ContextKey, PdkContextObject} from '@myparcel/pdk-frontend-shared';
import {MergeWithCustomizer} from 'lodash';
import {defineStore} from 'pinia';
import {mergeWith} from 'lodash-unified';
import {ref} from 'vue';

export const useContextStore = defineStore('context', () => {
  const context = ref<PdkContextObject>({} as PdkContextObject);

  const addContext = (newContext: Partial<PdkContextObject>, callback?: MergeWithCustomizer) => {
    mergeWith(
      context.value,
      newContext,
      callback ??
        ((src, val, key) => {
          if (key === ContextKey.ORDER_DATA && Array.isArray(src) && Array.isArray(val)) {
            src.push(...val);
          }
        }),
    );
  };

  return {
    addContext,
    context,
  };
});
