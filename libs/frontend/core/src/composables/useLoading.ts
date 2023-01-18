import {Ref, ref} from 'vue';
import {ActionCallbacks} from '../services';
import {PromiseOr} from '@myparcel/ts-utils';

type UseLoading = (initialValue?: boolean) => {
  loading: Ref<boolean>;
  setLoading: (state: boolean) => void;
  actionCallbacks: ActionCallbacks;
};

/**
 * Manages loading state.
 */
export const useLoading: UseLoading = (initialValue = false) => {
  const loading = ref<boolean>(initialValue);
  const setLoading = (state: boolean): void => {
    loading.value = state;
  };

  const actionCallbacks: ActionCallbacks = {
    start(): PromiseOr<void> {
      setLoading(true);
    },

    end(): PromiseOr<void> {
      setLoading(false);
    },
  };

  return {loading, setLoading, actionCallbacks};
};
