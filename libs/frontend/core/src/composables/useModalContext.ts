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
  modalId?: Ref<null | ModalKey>,
  onSave?: Ref<null | ModalCallback>,
  onCancel?: Ref<null | ModalCallback>,
) => null | {
  loading: Ref<boolean>;
  modalData: Ref;
  onButtonClick: (type: string) => Promise<void>;
  setLoading: (state: boolean) => void;
  shown: ComputedRef<boolean>;
};

export const useModalContext: UseModalContext = (modalId, onSave, onCancel) => {
  const store = useModalStore();
  const resolvedId = ref<ModalKey>(modalId?.value as ModalKey);

  if (!modalId?.value) {
    if (!store.opened) {
      return null;
    }

    resolvedId.value = store.opened;
  }

  const {loading, setLoading} = useLoading();
  const modalData = ref();
  const shown = computed(() => store.opened === resolvedId.value);

  const onButtonClick = async (type: string): Promise<void> => {
    const callback = type === 'save' ? onSave : onCancel;

    if (callback) {
      setLoading(true);
      await callback.value?.(resolvedId.value);
      setLoading(false);
    }
  };

  return {
    opened: store.opened,
    loading,
    modalData,
    onButtonClick,
    setLoading,
    shown,
  };
};
