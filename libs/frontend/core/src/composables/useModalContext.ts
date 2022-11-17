import {ComputedRef, Ref, computed, ref} from 'vue';
import {ModalKey} from '../types';
import {useLoading} from '@myparcel-pdk/frontend-shared';
import {useModalStore} from '../stores';

export type ModalData = Record<never, unknown> | null | undefined;

export type ModalCallback = (id: string) => Promise<void> | void;

export interface ModalCallbackProps {
  onCancel: ModalCallback;
  onSave: ModalCallback;
}

type UseModalContext = (
  modalId: Ref<ModalKey>,
  onSave?: Ref<null | ModalCallback>,
  onCancel?: Ref<null | ModalCallback>,
) => {
  loading: Ref<boolean>;
  modalData: Ref;
  onButtonClick: (type: string) => Promise<void>;
  setLoading: (state: boolean) => void;
  shown: ComputedRef<boolean>;
};

export const useModalContext: UseModalContext = (modalId, onSave, onCancel) => {
  const store = useModalStore();

  const {loading, setLoading} = useLoading();
  const modalData = ref();
  const shown = computed(() => store.opened === modalId.value);

  const onButtonClick = async (type: string): Promise<void> => {
    const callback = type === 'save' ? onSave : onCancel;

    if (callback) {
      setLoading(true);
      await callback.value?.(modalId.value);
      setLoading(false);
    }
  };

  return {
    loading,
    modalData,
    onButtonClick,
    setLoading,
    shown,
  };
};
