import {computed, type ComputedRef} from 'vue';
import {type AdminModalContext} from '../../types';
import {useModalStore} from '../../stores';
import {type AdminModalKey} from '../../data';

type UseModalElementContext = <K extends AdminModalKey>(
  modalKey: K | undefined,
) => {
  context: ComputedRef<AdminModalContext>;
  isOpen: ComputedRef<boolean>;
  close: ReturnType<typeof useModalStore>['close'];
};

// @ts-expect-error infinitely deep type instantiation
export const useModalElementContext: UseModalElementContext = (modalKey) => {
  const modalStore = useModalStore();

  const context = computed(() => (isOpen.value ? modalStore.context : null));

  const isOpen = computed(() => modalKey && modalStore.opened === modalKey);

  return {
    close: modalStore.close,
    context,
    isOpen,
  };
};
