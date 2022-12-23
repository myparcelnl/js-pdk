import {MergeWithCustomizer} from 'lodash';
import {PdkContextObject} from '../types';
import {defineStore} from 'pinia';
import {mergeWith} from 'lodash-unified';
import {ref} from 'vue';

export const useContextStore = defineStore('context', () => {
  const context = ref<PdkContextObject>({} as PdkContextObject);

  return {
    addContext: (newContext: Partial<PdkContextObject>, callback?: MergeWithCustomizer) => {
      mergeWith(
        context.value,
        newContext,
        callback ??
          ((src, val, key) => {
            /**
             * Merge orderData into existing values.
             */
            if (key === 'orderData' && Array.isArray(src) && Array.isArray(val)) {
              src.push(...val);
            }
          }),
      );
    },

    context,
  };
});
