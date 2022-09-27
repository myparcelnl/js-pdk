import {ComputedRef, Ref, computed, ref} from 'vue';
import {ModalKey} from '@myparcel/pdk-frontend-shared';
import {useLoading} from '../useLoading';
import {useModalStore} from '../../stores';

export type ModalData = Record<never, unknown> | null | undefined;

export type ModalCallback = (id: string) => Promise<void> | void;

export interface ModalCallbackProps {
  onLeave: ModalCallback;
  onSave: ModalCallback;
}

type UseModalContext = (
  modalId: ModalKey,
  onSave?: null | ModalCallback,
  onLeave?: null | ModalCallback,
) => {
  loading: Ref<boolean>;
  modalData: Ref;
  onButtonClick: (type: string) => Promise<void>;
  setLoading: (state: boolean) => void;
  shown: ComputedRef<boolean>;
};

export const useModalContext: UseModalContext = (modalId, onSave, onLeave) => {
  const store = useModalStore();

  const {loading, setLoading} = useLoading();
  const shown = computed(() => store.opened === modalId);
  const modalData = ref();

  const onButtonClick = async (type: string): Promise<void> => {
    const callback = type === 'save' ? onSave : onLeave;

    if (callback) {
      setLoading(true);
      await callback(modalId);
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
