import {computed, type ComputedRef, type MaybeRef, ref, type Ref, toValue} from 'vue';
import {type ReadonlyOr} from '@myparcel-dev/ts-utils';

export type UseLoadMoreOptions<Item = unknown> = {
  step?: number;
  start?: number;
  items: ReadonlyOr<MaybeRef<Item[]>>;
};

export type UseLoadMore<Item = unknown> = {
  loadMore(): void;
  hasMore: ComputedRef<boolean>;
  loaded: Ref<number>;
  items: ComputedRef<Item[]>;
};

export const useLoadMore = <Item = unknown>(options: UseLoadMoreOptions<Item>): UseLoadMore<Item> => {
  const loaded = ref(options.start ?? options.step ?? toValue(options.items).length - 1);

  const hasMore = computed(() => loaded.value < toValue(options.items).length - 1);

  const loadMore = () => {
    if (!hasMore.value) {
      return;
    }

    const step = options.step ?? 1;

    const maxLength = toValue(options.items).length;

    if (loaded.value + step > maxLength) {
      loaded.value = maxLength;
    } else {
      loaded.value += step;
    }
  };

  const items = computed(() => toValue(options.items).slice(0, loaded.value));

  return {
    items,
    loaded,
    hasMore,
    loadMore,
  };
};
