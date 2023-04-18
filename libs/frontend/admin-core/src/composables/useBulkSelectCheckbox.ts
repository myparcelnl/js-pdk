import {WritableComputedRef, computed, ref, watch} from 'vue';
import {Keyable} from '@myparcel-pdk/common/src';

export const useBulkSelectCheckbox = <K extends Keyable = Keyable, KS extends K[] = K[]>(
  options: KS,
  emit: (event: 'select', value: Record<K, boolean>) => void,
): {
  bulkModel: WritableComputedRef<Partial<Record<K, boolean>>>;
  bulkOptions: Keyable[];
} => {
  const selected = ref<Partial<Record<K, boolean>>>({});

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
