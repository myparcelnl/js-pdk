import {computed, ref, type UnwrapRef, watch, type WritableComputedRef} from 'vue';
import {type Keyable} from '@myparcel-pdk/admin-common';

type Value<K extends Keyable = Keyable> = Partial<Record<K, boolean>>;

export type PdkBulkSelectCheckboxEmits = (event: 'select', value: Record<Keyable, boolean>) => void;

export const useBulkSelectCheckbox = <K extends Keyable = Keyable, KS extends K[] = K[]>(
  options: KS,
  emit: PdkBulkSelectCheckboxEmits,
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
      emit('select', value as Record<K, boolean>);
    },
    {deep: true},
  );

  return {
    bulkModel,
    bulkOptions: options,
  };
};
