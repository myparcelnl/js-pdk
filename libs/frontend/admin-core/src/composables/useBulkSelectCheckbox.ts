import {type WritableComputedRef, computed, ref, watch, type UnwrapRef} from 'vue';
import {type Keyable} from '@myparcel-pdk/common';

type Value<K extends Keyable = Keyable> = Partial<Record<K, boolean>>;

export const useBulkSelectCheckbox = <K extends Keyable = Keyable, KS extends K[] = K[]>(
  options: KS,
  emit: (event: 'select', value: UnwrapRef<Value<K>>) => void,
): {
  bulkModel: WritableComputedRef<UnwrapRef<Value<K>>>;
  bulkOptions: Keyable[];
} => {
  const selected = ref<Value<K>>({});

  const bulkModel = computed({
    get() {
      return selected.value;
    },

    set(values) {
      selected.value = values;
    },
  });

  watch(
    bulkModel,
    (value) => {
      emit('select', value);
    },
    {deep: true},
  );

  return {
    bulkModel,
    bulkOptions: options,
  };
};
