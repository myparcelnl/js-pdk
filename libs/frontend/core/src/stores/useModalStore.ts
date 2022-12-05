import {ModalKey, NotificationCategory, PdkModalContext} from '../types';
import {defineStore} from 'pinia';
import {ref} from 'vue';
import {useNotificationStore} from './useNotificationStore';

export type ModalContextMap<K extends ModalKey = ModalKey> = Record<K, PdkModalContext<K>>;

export const useModalStore = defineStore('modal', () => {
  const opened = ref<ModalKey | null>(null);
  const context = ref<PdkModalContext | null>(null);
  const onOpen = ref<null | ((modal: ModalKey) => void)>(null);
  const onClose = ref<null | ((modal: null | ModalKey) => void)>(null);
  const loading = ref<boolean>(false);

  const open = <K extends ModalKey>(modal: K, newContext?: PdkModalContext<K>) => {
    onOpen.value?.(modal);

    opened.value = modal;
    context.value = newContext ?? null;
  };

  const close = () => {
    useNotificationStore().remove(NotificationCategory.MODAL);
    onClose.value?.(opened.value);
    opened.value = null;
    context.value = null;
  };

  return {
    loading,

    opened,
    context,

    onOpen,
    onClose,

    open,
    close,
  };
});
